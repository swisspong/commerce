import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;
    constructor() {
        super("Route not found")
    }
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: "Not found" }]
    }
}