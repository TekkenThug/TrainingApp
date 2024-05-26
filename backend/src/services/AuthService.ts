import status from "statuses";
import UserService from "@/services/UserService.ts";
import { ApiError } from "@/utils/errors.ts";
import TokenService from "@/services/TokenService.ts";
import { TokenTypes } from "@/configs/tokens.ts";

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

  static async refreshAuth(refreshToken: string) {
    try {
      const token = await TokenService.verifyToken(refreshToken, TokenTypes.REFRESH);
      const user = await UserService.getById(token.user.id);

      if (!user) {
        throw new Error();
      }

      await TokenService.invalidateRefreshToken(token.token);

      return await TokenService.generateAuthTokens(user);
    } catch (e) {
      throw new ApiError(status("UNAUTHORIZED"), "Please authenticate");
    }
  }
}
