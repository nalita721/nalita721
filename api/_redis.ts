import { Redis } from '@upstash/redis'

/**
 * Vercel's "Connect to Project" flow applied our chosen prefix
 * (UPSTASH_REDIS_REST) on top of its own default variable names instead of
 * replacing them, so the REST credentials ended up here rather than at the
 * plain UPSTASH_REDIS_REST_URL / _TOKEN that Redis.fromEnv() expects.
 */
export const kv = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!,
})
