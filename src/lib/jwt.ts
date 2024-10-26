// jwt.ts

/*
    !!!!!!!!! Unused File Functions !!!!!!!!!!
*/

// import { SignJWT, jwtVerify } from "jose";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import { SessionPayload, CookieType } from "../types/types";

// const JWT_KEY = new TextEncoder().encode(process.env.JWT_SECRET);
// const JWT_ALGO = "HS256";
// const expire = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

// export async function encrypt(payload: SessionPayload): Promise<string> {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: JWT_ALGO })
//     .setIssuedAt()
//     .setExpirationTime(expire)
//     .sign(JWT_KEY);
// }

// export async function decrypt(token: string): Promise<SessionPayload> {
//   const { payload } = await jwtVerify(token, JWT_KEY, {
//     algorithms: [JWT_ALGO],
//   });
//   return payload as SessionPayload;
// }

// export async function getSession(
//   req: NextRequest
// ): Promise<SessionPayload | null> {
//   const sessionCookie = req.cookies.get("session")?.value;
//   if (!sessionCookie) return null;

//   try {
//     const payload = await decrypt(sessionCookie);
//     return payload;
//   } catch (error) {
//     console.error("Error decrypting session:", error);
//     return null;
//   }
// }

// export async function setSession(payload: CookieType) {
//   const session = await encrypt({ ...payload, expire } as SessionPayload);
//   cookies().set("session", session, { expires: expire, httpOnly: true });
// }

// export async function updateSession(req: NextRequest): Promise<void> {
//   const sessionCookie = req.cookies.get("session")?.value;
//   if (!sessionCookie) return;

//   try {
//     const payload = await decrypt(sessionCookie);
//     payload.expire = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
//     const newSession = await encrypt(payload);
//     const res = NextResponse.next();
//     res.cookies.set({
//       name: "session",
//       value: newSession,
//       httpOnly: true,
//       expires: expire,
//     });
//   } catch (error) {
//     console.error("Error updating session:", error);
//   }
// }

// export async function signOut(): Promise<void> {
//   const sessionCookie = cookies().get("session");
//   if (sessionCookie) {
//     cookies().set("session", "", { expires: new Date(0), httpOnly: true });
//   }
// }
