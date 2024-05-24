import { Router } from "express";
import ProgramService from "@/services/ProgramService.ts";
import auth from "@/middlewares/auth.ts";

const router = Router();

router.route("/")
  .get(auth, async (_, res) => res.json(await ProgramService.getAll()))
  .post(async (req, res) => res.json(await ProgramService.create(req.body)));

router.route("/:programId")
  .get(async (req, res) => res.json(await ProgramService.getById(+req.params.programId)))

router.patch("/:programId/complete", async (req, res) => res.json(await ProgramService.increaseCompleteCount(+req.params.programId)))

export default router;
