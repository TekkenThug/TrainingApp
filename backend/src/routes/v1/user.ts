import { Router } from "express";
import UserService from "@/services/UserService.ts";

const router = Router();

router
  .route("/")
  .get(async (_, res) => res.json(await UserService.getAll()))
  .post(async (req, res) => res.json(await UserService.create(req.body)));

export default router;
