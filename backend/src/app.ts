import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "reflect-metadata";

import router from "@/routes/v1/";

import corsConfig from "@/configs/cors";

import { jwtStrategy } from "@/configs/passport";

const app = express();

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", router);

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

export default app;
