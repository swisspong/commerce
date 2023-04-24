import express from "express";
import bodyParser from "body-parser";
import api from "./api/v1"
import { errorHandler } from "./middlewares/errorHandler";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1', api);
app.use(errorHandler)
export { app }