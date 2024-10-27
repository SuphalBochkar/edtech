// @/lib/auth.ts

import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { User, Account, SessionStrategy } from "next-auth";
import { SessionType, TokenType } from "./types";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import type { Adapter } from "next-auth/adapters";

export const AUTH_PROVIDERS = {
  //   adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "google" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              paid: false,
              createdAt: new Date(),
            },
          });
          user.id = newUser.id;
          user.paid = newUser.paid;
        } else {
          user.id = existingUser.id;
          user.paid = existingUser.paid;
        }
      }
      return true;
    },

    async jwt({ token, user }: { token: TokenType; user: User | null }) {
      if (user) {
        token.userId = user.id;
        token.paid = user.paid;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: SessionType;
      token: TokenType;
    }) {
      if (token) {
        session.user.userId = token.userId;
        session.user.paid = token.paid;
      }
      return session;
    },
  },
};
