import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../../errors/not-found-error";

const prisma = new PrismaClient();
export const GetMerchantInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eMerchant = await prisma.merchant.findUnique({
            where: { id: req.currentUser?.id },
            select:{id:true,email:true,username:true}
        
        })
        if (!eMerchant) throw new NotFoundError();
        eMerchant
        res.json(eMerchant)
    } catch (error) {
        console.log(error)
        next(error)
    }
}