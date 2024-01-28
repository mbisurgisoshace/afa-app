import { PrismaClient } from "@prisma/client";

/**
 * This configuration is for PrismaClient not being generated everytime on NextJS hotreload while on development
 */
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
