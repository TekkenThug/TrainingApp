import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  APP_URL: z.string().url(),
  APP_WHITELIST: z.string(),
  NODE_ENV: z.string().regex(/^prod|dev$/gm),
  PORT: z.string().default("8000"),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRATION_MINUTES: z.string().default("30"),
  JWT_REFRESH_EXPIRATION_DAYS: z.string().default("30"),
});

const env = EnvSchema.parse(process.env);

export default {
  appUrl: env.APP_URL,
  appWhitelist: env.APP_WHITELIST.split(";"),
  appVersion: process.env.npm_package_version as string,
  env: env.NODE_ENV,
  port: env.PORT,
  jwt: {
    secret: env.JWT_SECRET,
    accessExpirationMinutes: env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: env.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
