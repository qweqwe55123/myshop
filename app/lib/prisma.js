// app/lib/prisma.js
import { PrismaClient } from "@prisma/client";

// 單例，避免開太多連線
const g = globalThis;
export const prisma = g.__PRISMA__ || new PrismaClient();
if (process.env.NODE_ENV !== "production") g.__PRISMA__ = prisma;
