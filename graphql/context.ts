import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";

export type Context = {
  auth: JWT | null;
  prisma: PrismaClient;
};
