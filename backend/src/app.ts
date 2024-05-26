import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "reflect-metadata";

import { AppDataSource } from "@/database/index.ts";
import router from "@/routes/v1/index.ts";

import config from "@/configs/config.ts";
import corsConfig from "@/configs/cors.ts";

import { jwtStrategy } from "@/configs/passport.ts";

const app = express();

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", router);

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

const init = async () => {
  try {
    await AppDataSource.initialize();

    app.listen(config.port, () => {
      // console.log(`Server is started on port: ${config.port}`);
    });
  } catch (e) {
    // console.log(e);
  }
};

init();
