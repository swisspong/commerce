import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { NotAuthorizedError } from "../errors/not-authorize-error";
interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express{
        interface Request{
            currentUser?: UserPayload
        }
    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        throw new NotAuthorizedError()
    }
    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        ) as UserPayload;
        req.currentUser = payload;
        next();
    } catch (err) {
        console.log(err)
        throw new NotAuthorizedError()
    }

};
