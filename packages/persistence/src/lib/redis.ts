import { redisClient } from "./redis-client";

export interface CacheOptions<T> {
  key: string;
  ttl: number;
  fetcher: () => Promise<T>;
  forceRefresh?: boolean;
  strategy?: "standard" | "stale-while-revalidate";
}

export class RedisCacheManager {
  static async getOrFetch<T>({
    key,
    ttl,
    fetcher,
    forceRefresh = false,
    strategy = "standard",
  }: CacheOptions<T>): Promise<T> {
    const cached = await redisClient.get(key);

    if (cached && !forceRefresh) {
      try {
        const parsed = JSON.parse(cached) as T;

        if (strategy === "stale-while-revalidate") {
          setTimeout(async () => {
            try {
              const fresh = await fetcher();
              await redisClient.set(key, JSON.stringify(fresh), "EX", ttl);
              console.log(`[RedisCache] 🔄 Refreshed stale cache for: ${key}`);
            } catch (err) {
              console.warn(
                `[RedisCache] ⚠️ Failed to refresh cache for ${key}`,
                err
              );
            }
          }, 0);
        }

        console.log(`[RedisCache] ✅ HIT: ${key}`);
        return parsed;
      } catch (err) {
        console.warn(
          `[RedisCache] ⚠️ Failed to parse cache for ${key}, refetching...`,
          err
        );
      }
    }

    const freshValue = await fetcher();
    await redisClient.set(key, JSON.stringify(freshValue), "EX", ttl);
    console.log(`[RedisCache] ❌ MISS: ${key}`);
    return freshValue;
  }

  static async get<T>(key: string): Promise<T | null> {
    const val = await redisClient.get(key);
    if (!val) return null;
    try {
      return JSON.parse(val) as T;
    } catch {
      console.warn(`[RedisCache] ⚠️ Failed to parse value at ${key}`);
      return null;
    }
  }

  static async set<T>(key: string, value: T, ttl: number) {
    await redisClient.set(key, JSON.stringify(value), "EX", ttl);
    console.log(`[RedisCache] 📝 SET: ${key}`);
  }

  static async del(key: string) {
    await redisClient.del(key);
    console.log(`[RedisCache] 🗑️ DEL: ${key}`);
  }
}
