import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { User, AuthOptions, SessionStrategy } from "next-auth";
import { EXPIRE_DAYS } from "./types";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import bcrypt from "bcryptjs";

export const AUTH_PROVIDERS: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
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
    CredentialsProvider({
      name: "Static Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Email or Password is missing");
          return null;
        }

        try {
          const email = credentials.email.toLowerCase();
          const staticUser = await prisma.staticUser.findUnique({
            where: { email: email },
          });
          if (
            staticUser &&
            bcrypt.compareSync(credentials.password, staticUser.password)
          ) {
            await prisma.session.deleteMany({
              where: { userId: staticUser.id },
            });

            return {
              id: staticUser.id,
              name: staticUser.email,
              email: staticUser.email,
              image: staticUser.image,
              paid: staticUser.paid,
              expireAt: staticUser.expireAt,
              courses: staticUser.courses,
            } as User;
          }
          console.log("Invalid email or password");
          return null;
        } catch (error) {
          console.error("Error fetching user:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database" as SessionStrategy,
    maxAge: EXPIRE_DAYS * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async signIn({ user }) {
      if (user.id) {
        await prisma.session.deleteMany({
          where: { userId: user.id },
        });
      }
      return true;
    },

    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.paid = user.paid;
        session.user.courses = user.courses;
        session.user.expireAt = user.expireAt;
      }
      return session;
    },
  },

  events: {
    async signIn({ user }) {
      if (user.id) {
        await prisma.session.deleteMany({
          where: {
            userId: user.id,
            expires: { lt: new Date() },
          },
        });
      }
    },
  },
};
