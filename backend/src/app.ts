import express from "express";
import bodyParser from "body-parser";
import api from "./api/v1"
import cors from 'cors'
import { errorHandler } from "./middlewares/errorHandler";
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors/not-found-error";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
    cookieSession({
        signed: false,
        secure: false,
        // secure: process.env.NODE_ENV !== "test",
    })
);


app.use('/api/v1', api);
app.all("*", async (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler)
export { app }