import status from "statuses";
import UserService from "@/services/UserService.ts";
import AuthService from "@/services/AuthService.ts";
import { catchAsync } from "@/utils/errors.ts";
import TokenService from "@/services/TokenService.ts";

const register = catchAsync(async (req, res) => {
  const user = await UserService.registerNewUser(req.body);

  res.status(status("CREATED")).send(user);
});

const login = catchAsync(async (req, res) => {
  const user = await AuthService.login(req.body);
  const tokens = await TokenService.generateAuthTokens(user);

  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await AuthService.logout(req.body.refreshToken);
  res.status(status("OK")).send();
})

export default { register, login, logout };
