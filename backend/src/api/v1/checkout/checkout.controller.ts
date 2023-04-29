import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs"
import { TCartId } from "../carts/carts.model";
import { BadRequestError } from "../../../errors/bad-request-error";
import { NotFoundError } from "../../../errors/not-found-error";
import { ICrItemReserved } from "./checkout.model";




const prisma = new PrismaClient()

export const Checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cart_id } = <TCartId>req.params
        const uid = new ShortUniqueId();
        const eCartItemList = await prisma.cartItem.findMany({
            where: { cart_id }, include: { product: { include: { Variant: true } }, variant: true }
        })
        let amount: number = 0;
        const createItemReservedList: ICrItemReserved[] = []
        eCartItemList.forEach(async (item) => {
            let subTotal: number = 0
            const prod_id = item.prod_id
            const vrnt_id = item.vrnt_id
            const product = await prisma.product.findUnique({
                where: { id: prod_id },
                include: {
                    ItemReserved: { where: { checkout: { expiredAt: { gte: new Date() } } }, include: { variant: true } },
                    Variant: { include: { VariantSelected: { include: { option: true } } } }
                }
            })
            if (!product)
                throw new NotFoundError()

            if (!vrnt_id && product.Variant.length <= 0 || vrnt_id && !product.Variant.find(vrnt => vrnt.id === vrnt_id))
                throw new NotFoundError()


            if (!product || !product?.availableStock || product?.availableStock && product.availableStock <= 0)
                throw new BadRequestError("Invalid Product")
            if (!product || !product.Variant || product?.Variant.length <= 0 || product.Variant[0].inventory <= 0)
                throw new BadRequestError("Invalid Product")

            const vrnt = product.Variant.find(vrnt => vrnt.id === vrnt_id)

            let availableStock = product.availableStock
            let vrntStock = vrnt ? vrnt.inventory : null

            product.ItemReserved.forEach(itr => {
                availableStock -= itr.quantity
                if (vrntStock)
                    vrntStock -= itr.quantity

            })

            if (vrntStock !== null && vrntStock - item.quantitiy <= 0 || availableStock - item.quantitiy <= 0)
                throw new BadRequestError("Product is not enough!")



            if (vrntStock !== null) {
                subTotal = product.Variant[0].price.toNumber() * item.quantitiy
            } else {
                subTotal = product.price.toNumber() * item.quantitiy
            }
            // utcTimestamp.setMinutes(utcTimestamp.getMinutes() + 30);


            createItemReservedList.push({ id: `itrs_${uid.stamp(15)}`, name: product.name, product_id: prod_id, description: vrnt?.VariantSelected.map(vrnts => vrnts.option.name).join(",") || "", quantity: item.quantitiy, total: subTotal, vrnt_id: item.vrnt_id })


            // const product = await prisma.product.findUnique({
            //     where: {
            //         id: prod_id
            //     },
            //     include: {
            //         OrderItemReserved: {
            //             where: {
            //                 product_id: prod_id,
            //                 expiredAt: {
            //                     lte: new Date()
            //                 }
            //             },
            //             include: {
            //                 variant: true
            //             }
            //         },

            //     }
            // })

            // let availableStock = product?.availableStock

        })
        const utcTimestamp: Date = new Date();
        utcTimestamp.setMinutes(utcTimestamp.getMinutes() + 15)
        const checkout = await prisma.checkout.create({
            data: {
                id: `chkt_${uid.stamp(15)}`,
                expiredAt: utcTimestamp.toISOString(),
                total: amount,
                ItemReserved: {
                    createMany: {
                        data: createItemReservedList
                    }
                }
            }
        })




        res.status(201).json(checkout)

    } catch (error) {
        console.log(error)
        next(error)
    }
}