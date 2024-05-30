import { Router } from "express";
import auth from "@/middlewares/auth";
import validate from "@/middlewares/validate";
import programValidation from "@/validations/program";
import programController from "@/controllers/programs";

const router = Router();

router
  .route("/")
  .get(auth, programController.getAll)
  .post(auth, validate(programValidation.create), programController.createProgram);
router.route("/:id").get(auth, validate(programValidation.getOne), programController.getProgramById);
router.patch("/:id/complete", auth, validate(programValidation.getOne), programController.completeProgram);

export default router;
