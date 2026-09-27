import { createClient } from "redis";

let client = null;
let isConnecting = false;

export async function getRedis() {
  if (!process.env.REDIS_HOST) {
    return null;
  }

  if (!client) {
    client = createClient({
      username: process.env.REDIS_USERNAME || "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) || 6379,
        connectTimeout: 2500,
        reconnectStrategy: (retries) => {
          if (retries > 2) {
            return false; // Stop reconnecting if server is unreachable
          }
          return Math.min(retries * 100, 500);
        },
      },
    });

    client.on("error", (err) => {
      // Suppress spammy disconnected logs
      if (process.env.NODE_ENV !== "production") {
        console.warn("[Redis Client Warning]:", err?.message || err);
      }
    });
  }

  if (!client.isOpen && !isConnecting) {
    try {
      isConnecting = true;
      await client.connect();
    } catch (err) {
      console.warn("[Redis] Connection attempt failed, continuing safely without Redis:", err?.message || err);
      // Reset client so subsequent requests can try afresh if network restores
      client = null;
      return null;
    } finally {
      isConnecting = false;
    }
  }

  return client?.isOpen ? client : null;
}
