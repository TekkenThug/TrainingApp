import { Router } from "express";

import authRouter from "./auth.js";
import userRouter from "./user.ts";
import programRouter from "./program.ts";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/programs", programRouter);

export default router;
