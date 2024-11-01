// @/lib/auth.ts

import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { User, Account, SessionStrategy, Session, JWT } from "next-auth";
import { EXPIRE_DAYS } from "./types";
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
    maxAge: EXPIRE_DAYS * 24 * 60 * 60,
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
        const expireAt = new Date(
          Date.now() + EXPIRE_DAYS * 24 * 60 * 60 * 1000
        );

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              paid: false,
              createdAt: new Date(),
              expireAt: expireAt,
            },
          });
          user.id = newUser.id;
          user.paid = newUser.paid;
          user.expireAt = expireAt;
          user.courses = newUser.courses;
        } else {
          user.id = existingUser.id;
          user.paid = existingUser.paid;
          user.expireAt = expireAt;
          user.courses = existingUser.courses;
        }
      }

      return user;
    },

    async jwt({ token, user }: { token: JWT; user: User | null }) {
      if (user) {
        token.id = user.id;
        token.paid = user.paid;
        token.expireAt = user.expireAt ?? new Date();
        token.courses = user.courses ?? [];
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.paid = token.paid as boolean;
        session.user.courses = token.courses as string[];
        // session.user.expireAt = token.expireAt;
      }

      return session;
    },
  },
};

// Session
// {
//     "user": {
//         "name": "FinishWhat YouStart",
//         "email": "finishwhatyoustart66@gmail.com",
//         "image": "https://lh3.googleusercontent.com/a/ACg8ocIJvhVYwJBn403pvaQ14HLkIp7FcU0uTmMd7hW8tk4f-rvmyHA=s96-c",
//         "userId": "67246ba80a0e38be5060b87e",
//         "paid": false,
//         "expireAt": "2024-11-16T09:01:45.398Z",
//         "courses": []
//     },
//     "expires": "2024-11-16T09:01:46.135Z"
// }

// export const SigninStartUser = {
//   id: "102544070136534517434",
//   name: "FinishWhat YouStart",
//   email: "finishwhatyoustart66@gmail.com",
//   image:
//     "https://lh3.googleusercontent.com/a/ACg8ocIJvhVYwJBn403pvaQ14HLkIp7FcU0uTmMd7hW8tk4f-rvmyHA=s96-c",
// };

// export const SigninEndUser = {
//   id: "6724b2b0b57ee6351a8a5ea3",
//   name: "FinishWhat YouStart",
//   email: "finishwhatyoustart66@gmail.com",
//   image:
//     "https://lh3.googleusercontent.com/a/ACg8ocIJvhVYwJBn403pvaQ14HLkIp7FcU0uTmMd7hW8tk4f-rvmyHA=s96-c",
//   paid: true,
//   expireAt: "2024-11-16T11:52:04.648Z",
//   courses: ["C1011", "C1011"],
// };

// export const JWTStartUser = {
//   id: "6724b2b0b57ee6351a8a5ea3",
//   name: "FinishWhat YouStart",
//   email: "finishwhatyoustart66@gmail.com",
//   image:
//     "https://lh3.googleusercontent.com/a/ACg8ocIJvhVYwJBn403pvaQ14HLkIp7FcU0uTmMd7hW8tk4f-rvmyHA=s96-c",
//   paid: true,
//   expireAt: "2024-11-16T11:52:04.648Z",
//   courses: ["C1011", "C1011"],
// };

// export const JWTStartToken = {
//   name: "FinishWhat YouStart",
//   email: "finishwhatyoustart66@gmail.com",
//   picture:
//     "https://lh3.googleusercontent.com/a/ACg8ocIJvhVYwJBn403pvaQ14HLkIp7FcU0uTmMd7hW8tk4f-rvmyHA=s96-c",
//   sub: "6724b2b0b57ee6351a8a5ea3",
// };

// export const JWTEndUser = {
//   id: "6724b2b0b57ee6351a8a5ea3",
//   name: "FinishWhat YouStart",
//   email: "finishwhatyoustart66@gmail.com",
//   image:
//     "https://lh3.googleusercontent.com/a/ACg8ocIJvhVYwJBn403pvaQ14HLkIp7FcU0uTmMd7hW8tk4f-rvmyHA=s96-c",
//   paid: true,
//   expireAt: "2024-11-16T11:52:04.648Z",
//   courses: ["C1011", "C1011"],
// };

// export const JWTEndToken = {
//   name: "FinishWhat YouStart",
//   email: "finishwhatyoustart66@gmail.com",
//   picture:
//     "https://lh3.googleusercontent.com/a/ACg8ocIJvhVYwJBn403pvaQ14HLkIp7FcU0uTmMd7hW8tk4f-rvmyHA=s96-c",
//   sub: "6724b2b0b57ee6351a8a5ea3",
//   id: "6724b2b0b57ee6351a8a5ea3",
//   paid: true,
//   expireAt: "2024-11-16T11:52:04.648Z",
//   courses: ["C1011", "C1011"],
// };
