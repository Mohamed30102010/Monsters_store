import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import fs from "node:fs";
import path from "node:path";

function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL;

  // On Vercel / serverless environment, copy db file to /tmp because /var/task is read-only
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    try {
      const tmpDbPath = path.join("/tmp", "dev.db");
      if (!fs.existsSync(tmpDbPath)) {
        const candidatePaths = [
          path.join(process.cwd(), "dev.db"),
          path.join(process.cwd(), "prisma", "dev.db"),
        ];
        for (const p of candidatePaths) {
          if (fs.existsSync(p)) {
            fs.copyFileSync(p, tmpDbPath);
            break;
          }
        }
      }
      if (fs.existsSync(tmpDbPath)) {
        return `file:${tmpDbPath}`;
      }
    } catch (e) {
      console.error("Failed to setup /tmp SQLite DB:", e);
    }
  }

  return envUrl && envUrl.length > 0 ? envUrl : "file:./dev.db";
}

// Prisma 7 بيعتمد على driver adapter بدل الـ binary engine
function makeClient() {
  const dbUrl = getDatabaseUrl();
  const adapter = new PrismaBetterSqlite3({
    url: dbUrl,
  });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

// Singleton عشان ما نفتحش اتصالات كتير في وضع التطوير (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof makeClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? makeClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
