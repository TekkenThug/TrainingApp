import { Router } from "express";
import config from "@/configs/config";

import authRouter from "./auth";
import userRouter from "./user";
import programRouter from "./program";
import docsRouter from "./docs";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/programs", programRouter);

if (config.env === "dev") {
  router.use("/docs", docsRouter);
}

export default router;
