import dotenv from "dotenv";
import { cleanEnv, port, str } from "envalid";
dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port({
    default: 6969,
  }),
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
    desc: "The environment in which the application is running",
  }),
  CLERK_SECRET_KEY: str({
    desc: "The secret key for Clerk authentication",
  }),
  CLERK_PUBLISHABLE_KEY: str({
    desc: "The publishable key for Clerk authentication",
  }),
});
