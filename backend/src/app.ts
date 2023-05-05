import express from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors/not-found-error";
import cors from 'cors'
import api from "./api/v1"




const app = express();
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: false,
    // secure: process.env.NODE_ENV !== "test",
  })
);



app.use('/api/v1', api);
app.all("*", async (req, res, next) => {
  try {
    throw new NotFoundError();
  } catch (error) {
    next(error)
  }
});
app.use(errorHandler)
export { app }