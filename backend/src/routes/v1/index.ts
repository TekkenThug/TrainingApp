import { Router } from "express";
import config from "@/configs/config";

import authRouter from "./auth";
import userRouter from "./user";
import docsRouter from "./docs";
import booksRouter from "./books";

const router = Router();

router.use("/auth", authRouter);
router.use("/books", booksRouter);
router.use("/users", userRouter);

if (config.env === "dev") {
  router.use("/docs", docsRouter);
}

export default router;
