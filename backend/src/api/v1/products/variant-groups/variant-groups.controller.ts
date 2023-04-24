import { NextFunction, Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import { TUpsertVariantGroups } from "./variant-groups.model";
import { TProductId } from "../product.model";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
interface OptionCreate {
    id: string
    name: string
}
interface OptionDel {
    id: string
}

interface OptionUpdate {
    where: {
        id: string
    },
    data: {
        name: string
    }
}
export const UpsertVariantGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(req.params.prod_id)

        const data = <TUpsertVariantGroups>req.body
        // console.log(data)
        const { prod_id } = <TProductId>req.params

        const eProduct = await prisma.product.findUnique({ where: { id: prod_id } })

        const uid = new ShortUniqueId();
        const existingVariantGroup = await prisma.variantGroup.findMany({ where: { prod_id: prod_id }, include: { Option: true } })
        const tmpUpdateVgrp: { where: { id: string }, data: { name: string, Option: { createMany: { data: { id: string, name: string }[] }, updateMany: { where: { id: string }, data: { name: string } }[], deleteMany: { id: string }[] } } }[] = []
        const tmpCreateVgrp: { id: string, name: string, Option: { createMany: { data: { id: string, name: string }[] } } }[] = []
        const tmpDelVgrp: { id: string }[] = []
        //create vgrp
        const newVgrp = data.variant_groups.filter(nvgrp => nvgrp.id === undefined)
        newVgrp.forEach(nvgrp => {
            const tmpCrOptn: OptionCreate[] = nvgrp.options.map(optn => ({ id: `optn_${uid.stamp(15)}`, name: optn.name }))
            tmpCreateVgrp.push({ id: `vgrp_${uid.stamp(15)}`, name: nvgrp.name, Option: { createMany: { data: tmpCrOptn } } })
        })

        existingVariantGroup.forEach(evgrp => {
            const newVgrp = data.variant_groups.find(nvgrp => nvgrp.id === evgrp.id)
            if (newVgrp) {
             
                //update
                const tmpDelOptn: OptionDel[] = []
                const tmpUpOptn: OptionUpdate[] = []
                const tmpCrOptn: OptionCreate[] = []

                //create
                tmpCrOptn.push(...newVgrp.options.filter(noptn => !noptn.id).map(noptn => ({ id: `optn_${uid.stamp(15)}`, name: noptn.name })))
                // console.log("create")
                // console.log(tmpCrOptn)
            
                evgrp.Option.forEach(eoptn => {
                    const objFound = newVgrp.options.find(noptn => eoptn.id === noptn.id)
                    if (objFound) {
                        //update
                        tmpUpOptn.push({ where: { id: objFound.id! }, data: { name: objFound.name } })
                    } else {
                        //delete
                        tmpDelOptn.push({ id: eoptn.id })
                    }
                })
                // console.log("delete")
                // console.log(tmpDelOptn)

                // console.log("update")
                // console.log(tmpUpOptn)


                tmpUpdateVgrp.push({ where: { id: newVgrp.id! }, data: { name: newVgrp.name, Option: { createMany: { data: tmpCrOptn }, updateMany: tmpUpOptn, deleteMany: tmpDelOptn } }})
            } else {
                //delete
                tmpDelVgrp.push({ id: evgrp.id })
            }
        })
        // console.log("update vgrp")
        // console.log(tmpUpdateVgrp)
        // tmpUpdateVgrp.forEach(item=>{
        //     // console.log(item)
        //     item.data.Option.deleteMany.forEach(item=>console.log(item))
        // })
        // console.log("delete vgrp")
        // console.log(tmpDelVgrp)
        // console.log("create vgrp")
        // console.log(tmpCreateVgrp)

        const result = await prisma.product.update({
            where: { id: prod_id },
            data: {
                VariantGroup: {
                    deleteMany: tmpDelVgrp,
                    create: tmpCreateVgrp,
                    update: tmpUpdateVgrp,
                    // update:[{where:{id:""},data:{name:"",Option:{createMany:{data:{id:"",name:""}},deleteMany:[{id:""}],updateMany:[{where:{id:""},data:{name:"",}},{where:}]}}}]
                }
            }
        })


        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const GetAllVariantGroupsByProdId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { prod_id } = <TProductId>req.params
        const result = await prisma.variantGroup.findMany({
            where: { prod_id },
            include: {
                Option: true
            }
        })


        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        next(error)
    }
}
