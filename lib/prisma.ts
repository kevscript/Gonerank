import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

let prisma: PrismaClient<Prisma.PrismaClientOptions, "query">;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
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
  }
  prisma = global.prisma;
  // prisma.$on("query", (e) => {
  //   console.log("Query time: " + e.duration + "ms");
  //   console.log("Duration: " + e.duration + "ms");
  //   console.log("\n");
  // });
}

export default prisma;
