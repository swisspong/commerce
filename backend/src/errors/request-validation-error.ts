import { ZodError } from "zod";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ZodError) {
        super("Invalid request parameters");

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.errors.map((err) => {
            return { message: err.message, field: err.path.toString() };
        });
    }
}
