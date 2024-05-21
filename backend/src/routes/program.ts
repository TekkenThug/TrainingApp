import { Router } from "express";
import ProgramService from "@/services/ProgramService.ts";

const router = Router();

router.route("/")
  .get(async (_, res) => res.json(await ProgramService.getAll()))
  .post(async (req, res) => res.json(await ProgramService.create(req.body)));

router.route("/:programId")
  .get(async (req, res) => res.json(await ProgramService.getById(+req.params.programId)))

export default router;
