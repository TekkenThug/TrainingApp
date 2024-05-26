import status from "statuses";
import { getUnixTime } from "date-fns";
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

  res.cookie("refreshToken", tokens.refresh.token, {
    maxAge: tokens.refresh.expires - getUnixTime(new Date()) * 1000,
    path: "/api/v1/auth",
    httpOnly: true,
  });

  res.send(tokens.access);
});

const logout = catchAsync(async (req, res) => {
  await AuthService.logout(req.cookies.refreshToken);
  res.status(status("OK")).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await AuthService.refreshAuth(req.cookies.refreshToken);

  res.cookie("refreshToken", tokens.refresh.token, {
    maxAge: tokens.refresh.expires - getUnixTime(new Date()) * 1000,
    path: "/api/v1/auth",
    httpOnly: true,
  });

  res.send(tokens.access);
});

export default { register, login, logout, refreshTokens };
