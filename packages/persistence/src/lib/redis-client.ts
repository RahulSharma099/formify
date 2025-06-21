import { Redis, Cluster } from "ioredis";
import { env } from "./env";

const createClient = () => {
  let client: Redis | Cluster;
  if (env.REDIS_CLUSTER_MODE) {
    client = new Redis.Cluster([env.REDIS_URL], {
      enableReadyCheck: false,
    });
  } else {
    client = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
  }

  return client;
};

const redisClient = createClient();

export const buildKey = (prefix: string, key: string): string =>
  `${prefix}:${key}`;

export { redisClient };
