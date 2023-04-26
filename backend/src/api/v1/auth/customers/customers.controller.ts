import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../../../errors/bad-request-error";
import bcrypt from "bcryptjs"

import { TSignin, TSignup } from "../shared/auth.model";


const prisma = new PrismaClient()

export const CustomerSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, username } = <TSignup>req.body
        const uid = new ShortUniqueId();

        const eCustomer = await prisma.customer.findUnique({
            where: { email }
        })

        if (eCustomer) {
            throw new BadRequestError("Email already used")
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);


        const credential = await prisma.customer.create({
            data: {
                id: `cstmr_${uid.stamp(15)}`,
                username,
                email,
                password: hash
            }
        })

        const userJwt = jwt.sign(
            {
                id: credential.id,
                email: credential.email,
            },
            process.env.JWT_KEY!
        );
        req.session = {
            jwt: userJwt
        }

        const { password: _, ...newObj } = credential;
        res.status(201).json(newObj);

    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const CustomerSignin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = <TSignin>req.body

        const eCustomer = await prisma.customer.findUnique({
            where: { email }
        })

        if (!eCustomer) {
            throw new BadRequestError("Invalid credentials")
        }


        const match = bcrypt.compareSync(password, eCustomer.password)
        if (!match) {
            throw new BadRequestError("Invalid Credentials");
        }


        const userJwt = jwt.sign(
            {
                id: eCustomer.id,
                email: eCustomer.email,
            },
            process.env.JWT_KEY!
        );
        req.session = {
            jwt: userJwt
        }

        const { password: _, ...newObj } = eCustomer;
        res.status(200).json(newObj);

    } catch (error) {
        console.log(error)
        next(error)
    }
}
