import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs"




const prisma = new PrismaClient()


export const Checkout = (req: Request, res: Response, next: NextFunction) => {

}