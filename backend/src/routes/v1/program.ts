import { Router } from "express";
import auth from "@/middlewares/auth.ts";
import programController from "@/controllers/programs.ts";

const router = Router();

router.route("/")
  .get(auth, programController.getAll)
  .post(auth, programController.createProgram);

router.route("/:programId")
  .get(auth, programController.getProgramById);

router.patch("/:programId/complete", auth, programController.completeProgram)

export default router;
