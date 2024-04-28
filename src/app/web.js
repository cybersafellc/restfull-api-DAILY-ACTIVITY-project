import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorMiddleware from "../middlewares/error-middleware.js";
import adminRouter from "../routes/admin-private.js";
import userRouter from "../routes/user-private.js";
import publicRouter from "../routes/public.js";

const web = express();
web.use(cors());
web.use(cookieParser());
web.use(bodyParser.json());
web.use(publicRouter);

web.use("/user", userRouter);
web.use("/admin", adminRouter);

web.use(errorMiddleware.notFound);
web.use(errorMiddleware.receiptError);
export default web;
