import { NextFunction, Request, Response } from "express"

import ShortUniqueId from "short-unique-id"
import { TCreateVariant, TDeleteManyVariant, TUpdateManyVariant } from "./variants.model"
import { PrismaClient } from "@prisma/client"
import { TProductId } from "../product.model";
const prisma = new PrismaClient();
export const CreateVariant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = <TCreateVariant>req.body
        const uid = new ShortUniqueId()
        const { prod_id } = <TProductId>req.params
        const options = data.options.map((item) => {
            const key = Object.keys(item)[0]
            const value = Object.values(item)[0]
            return { vgrp_id: key, optn_id: value }
        })
        const result = await prisma.variant.create({
            data: {
                id: `vrnt_${uid.stamp(15)}`,
                sku: data.sku,
                inventory: data.quantity || 0,
                prod_id: prod_id,
                price: data.price,
                description: data.description,
                VariantSelected: {
                    createMany: {
                        data: options
                    }
                }
            }
        })

        res.status(201).json(result)

    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const GetAllVariants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { prod_id } = <TProductId>req.params
        const result = await prisma.variant.findMany({
            where: { prod_id },
            include: {
                VariantSelected: true
            }
        })

        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        next(error)
    }
}

// specific data is change not send all
export const EditVariantArray = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = <TUpdateManyVariant>req.body

        const result = await Promise.all(data.variants.map(async (vrnt) => {
            const evrnt = await prisma.variant.findUnique({ where: { id: vrnt.id }, include: { VariantSelected: true } })
            const tmpUpOptn: { where: { vrnt_id: string, vgrp_id: string }, data: { optn_id: string } }[] = []
            const tmpDelOptn: { vrnt_id: string, vgrp_id: string }[] = []
            //create
            const tmpCrOptn: { optn_id: string, vgrp_id: string }[] = vrnt
                .options.filter(noptn => evrnt?.VariantSelected.find(eoptn => Object.keys(noptn)[0] === eoptn.vgrp_id) ? false : true)
                .map(noptn => {
                    const vrgpId = Object.keys(noptn)[0]
                    const optnId = Object.values(noptn)[0]
                    return { optn_id: optnId, vgrp_id: vrgpId }
                })
            evrnt?.VariantSelected.forEach(eoptn => {
                const newOptn = vrnt.options.find(noptn => Object.keys(noptn)[0] === eoptn.vgrp_id)
                if (newOptn) {
                    const vrgpId = Object.keys(newOptn)[0]
                    const optnId = Object.values(newOptn)[0]
                    //update
                    tmpUpOptn.push({ where: { vrnt_id: vrnt.id, vgrp_id: vrgpId }, data: { optn_id: optnId } })
                } else {
                    //delete
                    tmpDelOptn.push({ vrnt_id: vrnt.id, vgrp_id: eoptn.vgrp_id })
                }
            })

            return prisma.variant.update({
                where: {
                    id: vrnt.id
                },
                data: {
                    inventory: vrnt.quantity || 0,
                    price: vrnt.price,
                    sku: vrnt.sku,
                    description: "",
                    VariantSelected: {
                        deleteMany: tmpDelOptn,
                        updateMany: tmpUpOptn,
                        createMany: { data: tmpCrOptn },
                    }
                },
                include:{
                    VariantSelected:true
                }
            })
        }))


        res.json(result)

    } catch (error) {
        console.log(error)
        next(error)
    }
}



export const RemoveManyVariant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = <TDeleteManyVariant>req.body
        console.log(data)
        const result = await prisma.variant.deleteMany({
            where: {
                id: {
                    in: data.variants
                }
            }
            // where:{
            //     id:{
            //         in:["",""]
            //     }
            // }
        })
        res.json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}