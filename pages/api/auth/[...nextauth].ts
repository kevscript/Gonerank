import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // if the user already exists in the DB, update his twitter name and profile picture
      const userExistsInDb = await prisma.user.findFirst({
        where: { id: user.id },
      });
      if (!userExistsInDb) {
        return true;
      }
      const updateExistingUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: profile.name,
          image: profile.profile_image_url_https as string,
        },
      });

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      const {} = token;
      if (session) {
        session.user.role = token.role;
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
