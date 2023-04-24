import { Request, Response, NextFunction } from "express"
import { PrismaClient } from '@prisma/client'
import ShortUniqueId from "short-unique-id";
import { TCreateProduct, TProductId, TUpdateProduct } from "./product.model";
const prisma = new PrismaClient();

interface OptionDel {
    id: string
}
interface OptionCreate {
    id: string
    name: string
}
interface OptionUpdate {
    where: {
        id: string
    },
    data: {
        name: string
    }
}


export const CreateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = <TCreateProduct>req.body
        const uid = new ShortUniqueId();
        // const relateCategory = data.categories.map((item) => ({ cat_id: item.id, index: item.index }))
        const relateCategory = data.categories.map((item, index) => ({ cat_id: item.id, index }))
        
        const result = await prisma.product.create({
            data: {
                id: `prod_${uid.stamp(15)}`,
                name: data.name,
                description: data.description,
                availableStock: data.available_stock,
                price: data.price,
                ProductCategory: {
                    createMany: { data: relateCategory }
                }
            }
        })

        res.status(201).json(result)


    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const EditProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = <TUpdateProduct>req.body
        const { prod_id } = <TProductId>req.params
        const product = await prisma.product.findUnique({ where: { id: prod_id }, include: { ProductCategory: true } })
        // console.log(product)
        // const deleteCategory = product?.ProductCategory.filter(item => data.categories.find(category => category.id === item.cat_id) ? false : true).map(item => ({ id: item.id }))
        // const createCategory = data.categories.filter(category => product?.ProductCategory.find(item => item.cat_id === category.id) ? false : true).map((item, index) => ({ cat_id: item.id, index: index }))
        // const updateCategory = data.categories.filter(category => product?.ProductCategory.find(item => item.cat_id === category.id) ? true : false).map(item => ({ where: { cat_id: item.id, prod_id: product?.id }, data: { cat_id: item.id, index: item.index } }))
        // console.log(prod_id, data)
        const result = await prisma.product.update({
            where: { id: prod_id },
            data: {
                name: data.name,
                availableStock: data.available_stock,
                description: data.description,
                price: data.price,
                // ProductCategory: {
                //     // deleteMany:[],
                //     deleteMany: deleteCategory,
                //     createMany: { data: createCategory },
                //     // updateMany: updateCategory
                // }
            }
        })

        res.json(result)


    } catch (error) {
        next(error)
        console.log(error)
    }
}
export const RemoveProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { prod_id } = <TProductId>req.params


        const result = await prisma.product.delete({
            where: { id: prod_id }
        })

        res.json(result)


    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const GetAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const result = await prisma.product.findMany({})

        res.json(result)


    } catch (error) {
        console.log(error)
    }
}
export const GetProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = <string>req.params.prod_id

        const result = await prisma.product.findUnique({ where: { id } })

        res.json(result)


    } catch (error) {
        console.log(error)
    }
}


//variant group
// export const UpsertVariantGroup = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const data = <UpsertVariantGroupInput>req.body
//         data.prod_id = req.params.prod_id
//         const uid = new ShortUniqueId();

//         const existingVariantGroup = await prisma.variantGroup.findMany({ where: { prod_id: data.prod_id }, include: { Option: true } })

//         const tmpUpdateVgrp: { where: { id: string }, data: { name: string, Option: { createMany: { data: { id: string, name: string }[] }, updateMany: { where: { id: string }, data: { name: string } }[], deleteMany: { id: string }[] } } }[] = []

//         const tmpCreateVgrp: { id: string, name: string, Option: { createMany: { data: { id: string, name: string }[] } } }[] = []

//         const tmpDelVgrp: { id: string }[] = []



//         //create vgrp
//         const newVgrp = data.variant_groups.filter(nvgrp => nvgrp.id === undefined)
//         newVgrp.forEach(nvgrp => {
//             const tmpCrOptn: OptionCreate[] = nvgrp.options.map(optn => ({ id: `optn_${uid.stamp(15)}`, name: optn.name }))
//             tmpCreateVgrp.push({ id: `vgrp_${uid.stamp(15)}`, name: nvgrp.name, Option: { createMany: { data: tmpCrOptn } } })
//         })
//         existingVariantGroup.forEach(evgrp => {
//             const newVgrp = data.variant_groups.find(nvgrp => nvgrp.id === evgrp.id)
//             if (newVgrp) {
//                 //update
//                 const tmpDelOptn: OptionDel[] = []
//                 const tmpUpOptn: OptionUpdate[] = []
//                 const tmpCrOptn: OptionCreate[] = []

//                 //create
//                 tmpCrOptn.push(...newVgrp.options.filter(noptn => noptn.id === undefined).map(noptn => ({ id: `optn_${uid.stamp(15)}`, name: noptn.name })))
//                 evgrp.Option.forEach(eoptn => {
//                     const objFound = newVgrp.options.find(noptn => eoptn.id === noptn.id)
//                     if (objFound) {
//                         //update
//                         tmpUpOptn.push({ where: { id: objFound.id! }, data: { name: objFound.name } })
//                     } else {
//                         //delete
//                         tmpDelOptn.push({ id: evgrp.id })
//                     }
//                 })


//                 tmpUpdateVgrp.push({ where: { id: newVgrp.id! }, data: { name: newVgrp.name, Option: { createMany: { data: tmpCrOptn }, updateMany: tmpUpOptn, deleteMany: tmpDelOptn } } })
//             } else {
//                 //delete
//                 tmpDelVgrp.push({ id: evgrp.id })
//             }
//         })


//         const result = await prisma.product.update({
//             where: { id: data.prod_id },
//             data: {
//                 VariantGroup: {
//                     deleteMany: tmpDelVgrp,
//                     create: tmpCreateVgrp,
//                     update: tmpUpdateVgrp,
//                 }
//             }
//         })


//         res.json(result)


//     } catch (error) {
//         console.log(error)
//     }
// }


//variant
// export const CreateVariant = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const data = <CreateVariantInput>req.body
//         const uid = new ShortUniqueId()
//         const options = data.options.map((item) => {
//             const key = Object.keys(item)[0]
//             const value = Object.values(item)[0]
//             return { vgrp_id: key, optn_id: value }
//         })
//         const result = await prisma.variant.create({
//             data: {
//                 id: `vrnt_${uid.stamp(15)}`,
//                 sku: data.sku,
//                 inventory: data.quantity,
//                 price: data.price,
//                 description: "",
//                 VariantSelected: {
//                     createMany: {
//                         data: options
//                     }
//                 }
//             }
//         })

//         res.json(result)

//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// }
// export const RemoveVariant = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const data = <DeleteVariantInput>req.body

//         const result = await prisma.variant.deleteMany({
//             where: {
//                 id: {
//                     in: data.variants
//                 }
//             }
//         })

//         res.json(result)

//     } catch (error) {
//         console.log(error)
//     }
// }
// export const EditVariantArray = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const data = <UpdateVariantInput[]>req.body

//         const result = await Promise.all(data.map(async (vrnt) => {
//             const evrnt = await prisma.variant.findUnique({ where: { id: vrnt.id }, include: { VariantSelected: true } })
//             //create
//             const tmpUpOptn: { where: { vrnt_id: string, vgrp_id: string }, data: { optn_id: string } }[] = []
//             const tmpDelOptn: { vrnt_id: string, vgrp_id: string }[] = []
//             const tmpCrOptn: { optn_id: string, vgrp_id: string }[] = vrnt
//                 .options.filter(noptn => evrnt?.VariantSelected.find(eoptn => Object.keys(noptn)[0] === eoptn.vgrp_id) ? false : true)
//                 .map(noptn => {
//                     const vrgpId = Object.keys(noptn)[0]
//                     const optnId = Object.values(noptn)[0]
//                     return { optn_id: optnId, vgrp_id: vrgpId }
//                 })
//             evrnt?.VariantSelected.forEach(eoptn => {
//                 const newOptn = vrnt.options.find(noptn => Object.keys(noptn)[0] === eoptn.vgrp_id)
//                 if (newOptn) {
//                     const vrgpId = Object.keys(newOptn)[0]
//                     const optnId = Object.values(newOptn)[0]
//                     //update
//                     tmpUpOptn.push({ where: { vrnt_id: vrnt.id, vgrp_id: vrgpId }, data: { optn_id: optnId } })
//                 } else {
//                     //delete
//                     tmpDelOptn.push({ vrnt_id: vrnt.id, vgrp_id: eoptn.vgrp_id })
//                 }
//             })

//             return prisma.variant.update({
//                 where: {
//                     id: vrnt.id
//                 },
//                 data: {
//                     inventory: vrnt.quantity,
//                     price: vrnt.price,
//                     sku: vrnt.sku,
//                     description: "",
//                     VariantSelected: {
//                         deleteMany: tmpDelOptn,
//                         updateMany: tmpUpOptn,
//                         createMany: { data: tmpCrOptn },
//                     }
//                 }
//             })
//         }))


//         res.json(result)

//     } catch (error) {
//         console.log(error)
//     }
// }

