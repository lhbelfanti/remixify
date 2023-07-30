import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined // This must be a `var` and not a `let / const`
  var __db: PrismaClient | undefined // This must be a `var` and not a `let / const`
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect()
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect()
  }
  prisma = global.__db;
}

export { prisma };