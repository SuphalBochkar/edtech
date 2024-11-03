// @/lib/auth.ts

//~ Old Auth Without Prisma Adapter

// import GoogleProvider from "next-auth/providers/google";
// import { prisma } from "@/lib/prisma";
// import { User, Account, SessionStrategy, Session, JWT } from "next-auth";
// import { EXPIRE_DAYS } from "./types";
// export const AUTH_PROVIDERS = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//       authorization: {
//         params: {
//           prompt: "select_account",
//         },
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt" as SessionStrategy,
//     maxAge: EXPIRE_DAYS * 24 * 60 * 60,
//   },

//   pages: {
//     signIn: "/auth/signin",
//   },

//   callbacks: {
//     async signIn({ user, account }: { user: User; account: Account | null }) {
//       if (account?.provider === "google" && user.email) {
//         const existingUser = await prisma.user.findUnique({
//           where: { email: user.email },
//         });
//         const expireAt = new Date(
//           Date.now() + EXPIRE_DAYS * 24 * 60 * 60 * 1000
//         );

//         if (!existingUser) {
//           const newUser = await prisma.user.create({
//             data: {
//               email: user.email,
//               name: user.name,
//               image: user.image,
//               paid: false,
//               createdAt: new Date(),
//               expireAt: expireAt,
//             },
//           });
//           user.id = newUser.id;
//           user.paid = newUser.paid;
//           user.expireAt = expireAt;
//           user.courses = newUser.courses;
//         } else {
//           user.id = existingUser.id;
//           user.paid = existingUser.paid;
//           user.expireAt = expireAt;
//           user.courses = existingUser.courses;
//         }
//       }

//       return user;
//     },

//     async jwt({ token, user }: { token: JWT; user: User | null }) {
//       if (user) {
//         token.id = user.id;
//         token.paid = user.paid;
//         token.expireAt = user.expireAt ?? new Date();
//         token.courses = user.courses ?? [];
//       }
//       return token;
//     },

//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.paid = token.paid as boolean;
//         session.user.courses = token.courses as string[];
//         // session.user.expireAt = token.expireAt;
//       }

//       return session;
//     },
//   },
// };

import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { User, SessionStrategy, Session, JWT } from "next-auth";
import { EXPIRE_DAYS } from "./types";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";

export const AUTH_PROVIDERS = {
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
    async jwt({ token, user }: { token: JWT; user: User | null }) {
      if (user) {
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      const user = await prisma.user.findUnique({
        where: {
          id: token?.sub,
        },
      });

      if (!user) {
        console.log("No user found. Logging out...");
        return null;
      }

      session.user.id = user.id;
      session.user.paid = user.paid;
      session.user.courses = user.courses;

      return session;
    },
  },
};
