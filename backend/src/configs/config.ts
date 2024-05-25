import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  APP_WHITELIST: z.string(),
  PORT: z.string().default("8000"),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRATION_MINUTES: z.string().default("30"),
  JWT_REFRESH_EXPIRATION_DAYS: z.string().default("30"),
});

const env = EnvSchema.parse(process.env);

export default {
  appWhitelist: env.APP_WHITELIST.split(";"),
  port: env.PORT,
  jwt: {
    secret: env.JWT_SECRET,
    accessExpirationMinutes: env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: env.JWT_REFRESH_EXPIRATION_DAYS,
  }
}
