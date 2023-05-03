import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import ShortUniqueId from "short-unique-id";
const prisma = new PrismaClient();


export const CreateProductImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uid = new ShortUniqueId()
    const originalnameSplit = req.file!.originalname.split(".");
    originalnameSplit.splice(originalnameSplit.length - 1, 1);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const created = await prisma.asset.create({
      data: {
        name: originalnameSplit.join("."),
        url:
          "http://localhost:8000/api/v1/assets/products" +
          originalnameSplit.join(".") +
          "-" +
          uniqueSuffix +
          ".webp",
        id: `ast_${uid.stamp(15)}`
      },
    });

    res.status(201).json(created)
  } catch (error) {
    console.log(error)
    next(error)
  }
}
export const CreateSlipImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uid = new ShortUniqueId()
    const originalnameSplit = req.file!.originalname.split(".");
    originalnameSplit.splice(originalnameSplit.length - 1, 1);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const created = await prisma.asset.create({
      data: {
        name: originalnameSplit.join("."),
        url:
          "http://localhost:8000/api/v1/assets/slips" +
          originalnameSplit.join(".") +
          "-" +
          uniqueSuffix +
          ".webp",
        id: `ast_${uid.stamp(15)}`
      },
    });

    res.status(201).json(created)
  } catch (error) {
    console.log(error)
    next(error)
  }
}