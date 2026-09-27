import { headers } from "next/headers";
import { getRedis } from "./redis";

export const MAX_FAILED_ATTEMPTS = 5;
export const LOCKOUT_SECONDS = 15 * 60; // 15 minutes window / lockout

export async function getClientIp() {
  try {
    const headerList = await headers();
    const cfConnectingIp = headerList.get("cf-connecting-ip");
    if (cfConnectingIp) return cfConnectingIp.trim();

    const forwarded = headerList.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();

    const realIp = headerList.get("x-real-ip");
    if (realIp) return realIp.trim();
  } catch {}
  return "127.0.0.1";
}

export function getRateKey(ip) {
  const cleanIp = (ip || "127.0.0.1").replace(/[^a-zA-Z0-9_.-]/g, "_");
  return `cvpair:rate:admin:login:${cleanIp}`;
}

export async function checkAdminLoginRateLimit(ip) {
  try {
    if (!process.env.REDIS_HOST) {
      return { blocked: false, attempts: 0, retryAfterMinutes: 0, remaining: MAX_FAILED_ATTEMPTS };
    }

    const redis = await getRedis();
    if (!redis) {
      return { blocked: false, attempts: 0, retryAfterMinutes: 0, remaining: MAX_FAILED_ATTEMPTS };
    }

    const key = getRateKey(ip);
    const rawCount = await redis.get(key);
    const count = parseInt(rawCount, 10) || 0;

    if (count >= MAX_FAILED_ATTEMPTS) {
      const ttl = await redis.ttl(key);
      const remainingMinutes = Math.max(1, Math.ceil(ttl / 60));
      return {
        blocked: true,
        attempts: count,
        retryAfterMinutes: remainingMinutes,
        remaining: 0,
      };
    }

    return {
      blocked: false,
      attempts: count,
      remaining: Math.max(0, MAX_FAILED_ATTEMPTS - count),
    };
  } catch (err) {
    console.warn("[Redis RateLimiter] Check failed, allowing request:", err?.message || err);
    return { blocked: false, attempts: 0, retryAfterMinutes: 0, remaining: MAX_FAILED_ATTEMPTS };
  }
}

export async function recordFailedLoginAttempt(ip) {
  try {
    if (!process.env.REDIS_HOST) {
      return { attempts: 1, remaining: MAX_FAILED_ATTEMPTS - 1 };
    }

    const redis = await getRedis();
    if (!redis) {
      return { attempts: 1, remaining: MAX_FAILED_ATTEMPTS - 1 };
    }

    const key = getRateKey(ip);
    const count = await redis.incr(key);

    if (count === 1 || count >= MAX_FAILED_ATTEMPTS) {
      await redis.expire(key, LOCKOUT_SECONDS);
    }

    return {
      attempts: count,
      remaining: Math.max(0, MAX_FAILED_ATTEMPTS - count),
    };
  } catch (err) {
    console.warn("[Redis RateLimiter] Record failed:", err?.message || err);
    return { attempts: 1, remaining: MAX_FAILED_ATTEMPTS - 1 };
  }
}

export async function resetAdminLoginRateLimit(ip) {
  try {
    if (!process.env.REDIS_HOST) return;
    const redis = await getRedis();
    if (!redis) return;
    const key = getRateKey(ip);
    await redis.del(key);
  } catch (err) {
    console.warn("[Redis RateLimiter] Reset failed:", err?.message || err);
  }
}
