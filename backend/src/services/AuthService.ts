import status from "statuses";
import UserService from "@/services/UserService.ts";
import { ApiError } from "@/utils/errors.ts";
import TokenService from "@/services/TokenService.ts";

interface Credentials {
  email: string;
  password: string;
}

export default class AuthService {
  static async login(credentials: Credentials) {
    const user = await UserService.getByEmail(credentials.email);

    if (!user || !(await UserService.comparePasswords(credentials.password, user.password))) {
      throw new ApiError(status("Unauthorized"), "Incorrect email or password");
    }

    return user;
  }

  static async logout(refreshToken: string) {
    await TokenService.invalidateRefreshToken(refreshToken);
  }
}
