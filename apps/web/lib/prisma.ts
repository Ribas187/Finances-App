import { PrismaClient } from "@prisma/client";
import { isDevelopment } from "./environment";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (isDevelopment()) global.prisma = prisma;

export default prisma;
