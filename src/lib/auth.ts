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
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { User, SessionStrategy, Session, JWT } from "next-auth";
import { EXPIRE_DAYS } from "./types";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import bcrypt from "bcryptjs";

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
    CredentialsProvider({
      name: "Static Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Received Credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Email or Password is missing");
          return null;
        }

        try {
          const email = credentials.email.toLowerCase();
          const staticUser = await prisma.staticUser.findUnique({
            where: { email: email },
          });
          console.log("Fetched StaticUser:", staticUser);
          if (
            staticUser &&
            bcrypt.compareSync(credentials.password, staticUser.password)
          ) {
            return {
              id: staticUser.id,
              name: staticUser.email,
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
      if (token && token.sub) {
        const user = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
        });

        if (user) {
          session.user.id = user.id;
          session.user.paid = user.paid;
          session.user.courses = user.courses;
          return session;
        }

        const staticUser = await prisma.staticUser.findUnique({
          where: {
            id: token.sub,
          },
        });

        if (staticUser) {
          session.user.id = staticUser.id;
          session.user.name = staticUser.name;
          session.user.email = staticUser.email;
          session.user.image = staticUser.image;
          session.user.paid = staticUser.paid;
          session.user.courses = staticUser.courses;
          return session;
        }

        console.log("No user found. Logging out...");
        return null;
      }

      return null;
    },
  },
};
