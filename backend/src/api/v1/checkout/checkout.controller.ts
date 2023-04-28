import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs"
import { TCartId } from "../carts/carts.model";




const prisma = new PrismaClient()


export const Checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cart_id } = <TCartId>req.params
        const uid = new ShortUniqueId();
        const eCartItemList = await prisma.cartItem.findMany({
            where: { cart_id }, include: { product: { include: { Variant: true } }, variant: true }
        })
        let amount: number = 0;

        eCartItemList.forEach(async (item) => {
            const prod_id = item.prod_id
            const product = await prisma.product.findUnique({
                where: {
                    id: prod_id
                },
                include: {
                    OrderItemReserved: {
                        where: {
                            product_id: prod_id,
                            expiredAt: {
                                lte: new Date()
                            }
                        },
                        include: {
                            variant: true
                        }
                    },

                }
            })

            let availableStock = product?.availableStock

        })


        // await prisma.order.create({
        //     data:{
        //         id:`chkt_${uid.stamp(15)}`,
        //         total:amount,
        //         OrderItemReserved:{
        //             createMany:{data:[{}]}
        //         }
        //     }
        // })


        res.json({ cart_id })

    } catch (error) {
        console.log(error)
        next(error)
    }
}