// @/app/api/auth/[...nextauth]/route

import { AUTH_PROVIDERS } from "@/lib/auth";
import NextAuth from "next-auth";

// @ts-expect-error Type mismatch with AUTH_PROVIDERS
const handler = NextAuth(AUTH_PROVIDERS);

export { handler as GET, handler as POST };
