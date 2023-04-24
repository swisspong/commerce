import { NextFunction, Request, Response } from "express";
import { AnyZodObject, AnyZodTuple, ZodError } from 'zod';
import { RequestValidationError } from "../errors/request-validation-error";
import * as z from 'zod';
type AnyZodArray = z.ZodArray<AnyZodObject>;
interface RequestValidators {
    params?: AnyZodObject,
    body?: any,
    query?: AnyZodObject,
}
export function validateRequest(validators: RequestValidators) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (validators.params) {
                req.params = await validators.params.parseAsync(req.params);
            }
            if (validators.body) {
                req.body = await validators.body.parseAsync(req.body);
            }
            if (validators.query) {
                req.query = await validators.query.parseAsync(req.query);
            }
            next();
        } catch (error) {
            // console.log(error)
            if (error instanceof ZodError) {
                next(new RequestValidationError(error));
            } else {
                next(error)
            }
        }
    };
}