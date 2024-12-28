// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import { User, AuthOptions, SessionStrategy } from "next-auth";
// import { EXPIRE_DAYS } from "./types";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import type { Adapter } from "next-auth/adapters";
// import bcrypt from "bcryptjs";

// export const AUTH_OPTIONS: AuthOptions = {
//   adapter: PrismaAdapter(prisma) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//       allowDangerousEmailAccountLinking: true,
//       authorization: {
//         params: {
//           prompt: "select_account",
//         },
//       },
//     }),
//     CredentialsProvider({
//       name: "Static Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           console.log("Email or Password is missing");
//           return null;
//         }

//         try {
//           const email = credentials.email.toLowerCase();
//           const staticUser = await prisma.staticUser.findUnique({
//             where: { email: email },
//           });
//           if (
//             staticUser &&
//             bcrypt.compareSync(credentials.password, staticUser.password)
//           ) {
//             await prisma.session.deleteMany({
//               where: { userId: staticUser.id },
//             });

//             return {
//               id: staticUser.id,
//               name: staticUser.email,
//               email: staticUser.email,
//               image: staticUser.image,
//               paid: staticUser.paid,
//               expireAt: staticUser.expireAt,
//               courses: staticUser.courses,
//             } as User;
//           }
//           console.log("Invalid email or password");
//           return null;
//         } catch (error) {
//           console.error("Error fetching user:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "database" as SessionStrategy,
//     maxAge: EXPIRE_DAYS * 24 * 60 * 60,
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },

//   callbacks: {
//     // async signIn({ user, account }) {
//     //   try {
//     //     if (account?.provider === "google" && user.email) {
//     //       console.log("Sigin 1: ", account);
//     //       console.log("Sigin 1: ", user);
//     //       const existingUser = await prisma.user.findUnique({
//     //         where: { email: user.email },
//     //       });
//     //       if (existingUser?.id) {
//     //         console.log("Existing user found:", existingUser);
//     //         console.log("Updating user with new session...");

//     //         await prisma.session.deleteMany({
//     //           where: { userId: existingUser.id },
//     //         });

//     //         await prisma.user.update({
//     //           where: { id: existingUser.id },
//     //           data: {
//     //             expireAt: new Date(
//     //               Date.now() + EXPIRE_DAYS * 24 * 60 * 60 * 1000
//     //             ),
//     //             name: user.name ?? user.email,
//     //             image: user.image,
//     //           },
//     //         });
//     //       } else {
//     //         console.log("Creating new user with email:", user.email);
//     //         console.log("User details:", {
//     //           name: user.name ?? user.email,
//     //           image: user.image,
//     //           expireAt: new Date(
//     //             Date.now() + EXPIRE_DAYS * 24 * 60 * 60 * 1000
//     //           ),
//     //         });

//     //         await prisma.user.create({
//     //           data: {
//     //             email: user.email,
//     //             name: user.name ?? user.email,
//     //             image: user.image,
//     //             paid: false,
//     //             expireAt: new Date(
//     //               Date.now() + EXPIRE_DAYS * 24 * 60 * 60 * 1000
//     //             ),
//     //             courses: [],
//     //           },
//     //         });
//     //       }
//     //     }

//     //     return true;
//     //   } catch (error) {
//     //     console.error("Error in signIn callback:", error);
//     //     return false;
//     //   }
//     // },

//     // async jwt({ token, user }) {
//     //   try {
//     //     if (user) {
//     //       const userData = user.email
//     //         ? await prisma.user.findUnique({ where: { email: user.email } })
//     //         : await prisma.staticUser.findUnique({ where: { id: user.id } });

//     //       if (userData) {
//     //         token.id = userData.id;
//     //         token.paid = userData.paid;
//     //         token.courses = userData.courses;
//     //         token.expireAt = userData.expireAt;
//     //       }
//     //     }
//     //     return token;
//     //   } catch (error) {
//     //     console.error("Error in jwt callback:", error);
//     //     return token;
//     //   }
//     // },

//     async session({ session, user }) {
//       if (user) {
//         session.user.id = user.id;
//         session.user.paid = user.paid;
//         session.user.courses = user.courses;
//         session.user.expireAt = user.expireAt;
//       }
//       return session;
//     },
//   },

//   events: {
//     async signIn({ user }) {
//       if (user.id) {
//         const existingUser = await prisma.user.findUnique({
//           where: { id: user.id },
//         });
//         if (existingUser) {
//           const sessions = await prisma.session.findMany({
//             where: { userId: user.id },
//           });
//           if (sessions.length > 1) {
//             const [, ...oldSessions] = sessions.sort(
//               (a, b) => b.expires.getTime() - a.expires.getTime()
//             );
//             await prisma.session.deleteMany({
//               where: {
//                 userId: user.id,
//                 id: {
//                   in: oldSessions.map((s) => s.id),
//                 },
//               },
//             });
//           }
//         }
//       }
//     },

//     async signOut({ token }) {
//       try {
//         if (token?.id) {
//           await prisma.session.deleteMany({
//             where: { userId: token.id },
//           });
//         }
//       } catch (error) {
//         console.error("Error in signOut event:", error);
//       }
//     },
//   },
// };

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { User, AuthOptions, SessionStrategy } from "next-auth";
import { EXPIRE_DAYS } from "./types";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { encode as defaultEncode } from "next-auth/jwt";
import type { Adapter } from "next-auth/adapters";
import { getUserFromDb } from "@/actions/user.actions";
import { v4 as uuid } from "uuid";

const adapter = PrismaAdapter(prisma) as Adapter;

export const AUTH_OPTIONS: AuthOptions = {
  adapter: adapter,
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
      name: "Credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          console.log("Email or Password is missing");
          return null;
        }
        const res = await getUserFromDb(email, password);
        if (!res.success) {
          console.log("Error signing in:", res.message);
          return null;
        }
        return res.data as User;
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
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
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

  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();
        if (!params.token?.sub) {
          console.error("No user ID found in token");
          return defaultEncode(params);
        }
        if (!adapter?.createSession) {
          console.error("Adapter does not support createSession");
          return defaultEncode(params);
        }
        const createdSession = await adapter.createSession({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + EXPIRE_DAYS * 24 * 60 * 60 * 1000),
        });
        if (!createdSession) {
          console.error("Failed to create session");
          return defaultEncode(params);
        }
        return sessionToken;
      }
      return defaultEncode(params);
    },
  },

  events: {
    async signIn({ user }) {
      if (user.id) {
        const existingUser = await prisma.user.findUnique({
          where: { id: user.id },
        });
        if (existingUser) {
          const sessions = await prisma.session.findMany({
            where: { userId: user.id },
          });
          if (sessions.length > 1) {
            const [, ...oldSessions] = sessions.sort(
              (a, b) => b.expires.getTime() - a.expires.getTime()
            );
            await prisma.session.deleteMany({
              where: {
                userId: user.id,
                id: {
                  in: oldSessions.map((s) => s.id),
                },
              },
            });
          }
        }
      }
    },

    async signOut({ token }) {
      try {
        if (token?.id) {
          const sessions = await prisma.session.findMany({
            where: { userId: token.id },
          });

          if (sessions.length > 1) {
            const [, ...oldSessions] = sessions.sort(
              (a, b) => b.expires.getTime() - a.expires.getTime()
            );
            await prisma.session.deleteMany({
              where: {
                userId: token.id,
                id: {
                  in: oldSessions.map((s) => s.id),
                },
              },
            });
          }
        }
      } catch (error) {
        console.error("Error in signOut event:", error);
      }
    },
  },
};
