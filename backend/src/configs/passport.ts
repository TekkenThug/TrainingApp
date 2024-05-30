import { Strategy, ExtractJwt, VerifyCallback, StrategyOptionsWithoutRequest } from "passport-jwt";
import config from "@/configs/config";
import UserService from "@/services/UserService";
import { TokenTypes } from "@/configs/tokens";

const jwtOptions: StrategyOptionsWithoutRequest = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== TokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }

    const user = await UserService.getById(payload.sub);
    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (e) {
    done(e, false);
  }
};

export const jwtStrategy = new Strategy(jwtOptions, jwtVerify);
