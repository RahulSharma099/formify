import dotenv from "dotenv";
dotenv.config();
import { bool, cleanEnv, port, str } from "envalid";

export const env = cleanEnv(process.env, {
  DATABASE_URL: str({
    desc: "The URL of the database to connect to",
  }),
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
    desc: "The environment in which the application is running",
  }),
  REDIS_URL: str({
    desc: "The URL of the Redis instance to connect to",
  }),
  REDIS_CLUSTER_MODE: bool({
    default: false,
  }),
});
