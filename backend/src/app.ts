import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "reflect-metadata";

import router from "@/routes/v1";
import { errorConverter, errorHandler } from "@/middlewares/error";

import morgan from "@/configs/morgan";

import corsConfig from "@/configs/cors";
import { jwtStrategy } from "@/configs/passport";

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", router);

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use(errorConverter);
app.use(errorHandler);

export default app;
