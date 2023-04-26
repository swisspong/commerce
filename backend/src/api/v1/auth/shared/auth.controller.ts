import { NextFunction, Request, Response } from "express";

export const Signout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session = null;
        res.json({});
    } catch (error) {
        console.log(error)
        next(error)
    }
}