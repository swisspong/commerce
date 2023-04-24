

import { Request, Response, NextFunction } from "express"
import ShortUniqueId from 'short-unique-id';
import { PrismaClient } from '@prisma/client'
import { TCreateCategories, TUpdateCategories } from "./categories.model";

const prisma = new PrismaClient()

export const CreateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = <TCreateCategories>req.body
        const uid = new ShortUniqueId();
        const formatData = data.map((item,index) => ({ id: `cat_${uid.stamp(15)}`, name: item.name, index }))

        const result = await prisma.category.createMany({
            data: formatData,
        })

        res.status(201).json(result)


    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const GetAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await prisma.category.findMany({ orderBy: { index: "asc" } })
        res.json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const EditCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = <TUpdateCategories>req.body

        const dataToUpdate = data.filter(item => !item.isDelete).map((item, index) => ({ where: { id: item.id }, data: { name: item.name, index } }))
        const dataToDelete = data.filter(item => item.isDelete).map(item => item.id)
        // console.log(dataToUpdate)
        // console.log(dataToDelete)
        const updated = await Promise.all(dataToUpdate.map(data => {
            return prisma.category.update(data)
        }))
        const deleted = await prisma.category.deleteMany({
            where: {
                id: {
                    in: dataToDelete
                }
            }
        })

        res.json(updated)



    } catch (error) {
        console.log(error)
        next(error)
    }
}








