import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  APP_URL: z.string().url(),
  APP_WHITELIST: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  NODE_ENV: z.union([z.literal("prod"), z.literal("dev")]),
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
  db: {
    host: env.DB_HOST,
    port: +env.DB_PORT,
    name: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  },
  env: env.NODE_ENV,
  port: env.PORT,
  jwt: {
    secret: env.JWT_SECRET,
    accessExpirationMinutes: env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: env.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
