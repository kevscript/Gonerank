import prisma from "@/lib/prisma";
import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { getToken } from "next-auth/jwt";
import { Context } from "../../graphql/context";
import { schema } from "../../graphql/schema";

const secret = process.env.NEXTAUTH_SECRET;

const cors = Cors();

const apolloServer = new ApolloServer({
  schema: schema,
  context: async ({ req }): Promise<Context> => {
    const auth = await getToken({ req, secret });
    return { auth: auth, prisma: prisma };
  },
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
  api: { bodyParser: false },
};
