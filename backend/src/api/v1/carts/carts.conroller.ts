import { PrismaClient, Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import { CreateCartItem, ExistingVariant, TAddItemToCart, TCartId, TItemId, TUpdateItemInCart, UpdateCartItem, UpdateItemQty } from "./carts.model";
import { BadRequestError } from "../../../errors/bad-request-error";
import { NotFoundError } from "../../../errors/not-found-error";
const prisma = new PrismaClient();
export const CreateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uid = new ShortUniqueId();
        const result = await prisma.cart.create({
            data: { id: `cart_${uid.stamp(15)}` }
        })

        res.status(201).json(result)


    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const EmptyCart = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { cart_id } = <TCartId>req.params
        const eCart = await prisma.cart.findUnique({ where: { id: cart_id } })
        if (!eCart) {
            throw new NotFoundError()
        }

        const result = await prisma.cart.update({
            where: { id: cart_id },
            data: {
                CartItem: {
                    deleteMany: []
                }
            },

        })

        res.json(result)

    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const AddItemToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = <TAddItemToCart>req.body
        const cart_id = req.params.cart_id
        const uid = new ShortUniqueId();
        let tmpCrItem: CreateCartItem[] = []
        const tmpUpItem: UpdateItemQty[] = []
        const eCart = await prisma.cart.findUnique({
            where: { id: cart_id },
            include: {
                CartItem: {
                    where: { prod_id: data.id, vrnt_id: data.variant_id },
                    include: { product: { include: { Variant: { where: { id: data.variant_id || "" } } } } }
                }
            }
        })

        //check cart is found
        if (!eCart) {
            throw new NotFoundError();
        }


        if (eCart.CartItem.length > 0) {
            //is existing in cart
            const availableStock = eCart.CartItem[0].product.availableStock
            const inventory = eCart.CartItem[0].product.Variant.length > 0 ? eCart.CartItem[0].product.Variant[0].inventory : null
            const newQuantity = data.quantity + eCart.CartItem[0].quantitiy
            const cartItemId = eCart.CartItem[0].id
            //check quantity in stock
            if ((inventory !== null && availableStock < newQuantity && inventory < newQuantity) || (inventory === null && availableStock < newQuantity)) {
                throw new BadRequestError("Product not enough!");
            }
            tmpUpItem.push({ where: { id: cartItemId }, data: { quantitiy: { increment: data.quantity } } })
        } else {
            //is new product add to cart
            const eProduct = await prisma.product.findUnique({ where: { id: data.id }, include: { Variant: { where: { id: data.variant_id || "" } } } })
            //check is found
            if (eProduct?.id !== data.id || (data.variant_id === null && eProduct.Variant.length <= 0) || (data.variant_id !== null && eProduct.Variant.length > 0 && data.variant_id !== eProduct.Variant[0].id)) {
                throw new NotFoundError();
            }
            const availableStock = eProduct.availableStock
            const inventory = eProduct.Variant.length > 0 ? eProduct.Variant[0].inventory : null
            const newQuantity = data.quantity
            //check is enough
            if ((inventory !== null && availableStock < newQuantity && inventory < newQuantity) || (inventory === null && availableStock < newQuantity)) {
                throw new BadRequestError("Product is not enough!");
            }
            tmpCrItem.push({ id: `item_${uid.stamp(15)}`, prod_id: data.id, quantitiy: newQuantity, vrnt_id: data.variant_id || null })
        }
        const result = await prisma.cart.update({
            where: { id: cart_id },
            data: {
                CartItem: {
                    createMany: { data: tmpCrItem },
                    updateMany: tmpUpItem
                }
            },
        })

        res.json(result)


    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const EditItemInCartById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = <TUpdateItemInCart>req.body
        const { cart_id, item_id } = <TItemId>req.params
        const eCart = await prisma.cart.findUnique({ where: { id: cart_id }, include: { CartItem: { where: { id: item_id }, include: { product: { include: { Variant: { where: { id: data.variant_id || "" } } } } } } } })

        //check cart is found
        if (!eCart || eCart.CartItem.length <= 0 || (data.variant_id && eCart.CartItem[0].product.Variant.length <= 0)) {
            throw new NotFoundError();
        }

        //check stock is enough
        if (eCart.CartItem[0].product.availableStock < data.quantity || (data.variant_id && eCart.CartItem[0].product.Variant[0].inventory < data.quantity)) {
            throw new BadRequestError("Product is not enough!");
        }



        const result = await prisma.cart.update({
            where: { id: cart_id },
            data: {
                CartItem: {
                    update: { where: { id: item_id }, data: { quantitiy: data.quantity, vrnt_id: data.variant_id } }
                }
            },

        })

        res.json(result)


    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const RemoveItemInCartById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cart_id, item_id } = <TItemId>req.params
        const eCart = await prisma.cart.findUnique({ where: { id: cart_id }, include: { CartItem: { where: { id: item_id } } } })
        if (!eCart || eCart.CartItem.length <= 0) {
            throw new NotFoundError()
        }
        const result = await prisma.cart.update({
            where: { id: cart_id },
            data: {
                CartItem: {
                    delete: { id: item_id }
                }
            },

        })

        res.json(result)

    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const GetCartInfoByCartId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cart_id } = <TCartId>req.params
        const eCart = await prisma.cart.findUnique({ where: { id: cart_id }, include: { CartItem: true } })
        if (!eCart || eCart.CartItem.length <= 0) {
            throw new NotFoundError()
            // throw new NotFoundError()
        }
        //fdsfds
        res.json(eCart)

    } catch (error) {
        console.log(error)
        next(error)
    }
}