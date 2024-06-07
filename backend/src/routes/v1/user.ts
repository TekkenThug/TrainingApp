import { Router } from "express";
import UserService from "@/services/UserService";

const router = Router();

router.route("/").get(async (_, res) => res.json(await UserService.getAll()));

export default router;
