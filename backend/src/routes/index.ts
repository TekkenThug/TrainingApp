import { Router } from "express";

import userRouter from "./user.ts";
import programRouter from "./program.ts";

const router = Router();

router.use("/users", userRouter);
router.use("/programs", programRouter);

export default router;
