import { Request, Response } from "express";
import status from "statuses";
import UserService from "@/services/UserService.ts";
import AuthService from "@/services/AuthService.ts";
import { catchAsync } from "@/utils/errors.ts";
import TokenService from "@/services/TokenService.ts";

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.registerNewUser(req.body);

  res.status(status("CREATED")).send(user);
});

const login = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthService.login(req.body);
  const tokens = await TokenService.generateAuthTokens(user);

  return res.send({ user, tokens });
});

export default { register, login };
