import jwt from "jsonwebtoken";
import { User } from "@/database/entity/User.ts";
import { addDays, addMinutes, getTime } from "date-fns";
import config from "@/configs/config.ts";
import { TokenTypes } from "@/configs/tokens.ts";
import { AppDataSource } from "@/database/index.ts";
import { Token } from "@/database/entity/Token.ts";
import UserService from "@/services/UserService.ts";
import { Timestamp } from "@/types/common.ts";

export default class TokenService {
  private static repository = AppDataSource.getRepository(Token);

  private static async generateToken(
    userId: number,
    expires: Timestamp,
    type: string,
    secret = config.jwt.secret
  ) {
    const payload = {
      sub: userId,
      iat: getTime(new Date()),
      exp: expires,
      type,
    };
    return jwt.sign(payload, secret);
  }

  private static async saveToken(token: string, userId: number, expires: number, type: TokenTypes) {
    const user = await UserService.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const newToken = new Token();

    newToken.token = token;
    newToken.user = user;
    newToken.type = type;
    newToken.expires = expires;

    return await TokenService.repository.save(newToken);
  }

  static async generateAuthTokens(user: User) {
    const accessTokenExpires = addMinutes(new Date(), +config.jwt.accessExpirationMinutes);
    const accessToken = await TokenService.generateToken(user.id, getTime(accessTokenExpires), TokenTypes.ACCESS);

    const refreshTokenExpires = addDays(new Date(), +config.jwt.refreshExpirationDays);
    const refreshToken = await TokenService.generateToken(user.id, getTime(refreshTokenExpires), TokenTypes.REFRESH);
    await TokenService.saveToken(refreshToken, user.id, getTime(refreshTokenExpires), TokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires,
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires,
      },
    };
  }
}
