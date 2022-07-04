import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
export const prisma: PrismaClient<Prisma.PrismaClientOptions, "query"> =
  global.prisma ||
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "error",
      },
      {
        emit: "stdout",
        level: "info",
      },
      {
        emit: "stdout",
        level: "warn",
      },
    ],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// prisma.$on("query", (e) => {
//   console.log("Query time: " + e.duration + "ms");
//   console.log("Duration: " + e.duration + "ms");
//   console.log("\n");
// });

export default prisma;
