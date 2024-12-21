"use server";

import { getServerSession } from "next-auth/next";
import { AUTH_OPTIONS } from "../lib/auth";
import { prisma } from "../lib/prisma";

export async function checkSessionValidity() {
  try {
    const session = await getServerSession(AUTH_OPTIONS);

    if (!session?.user?.id) {
      return { valid: false };
    }

    const currentSession = await prisma.session.findFirst({
      where: {
        userId: session.user.id,
        expires: { gt: new Date() },
      },
      orderBy: {
        expires: "desc",
      },
    });

    if (!currentSession) {
      return { valid: false };
    }

    // Get count of other active sessions
    const otherActiveSessions = await prisma.session.count({
      where: {
        userId: session.user.id,
        expires: { gt: new Date() },
        NOT: {
          id: currentSession.id,
        },
      },
    });

    // If there are other active sessions, this one is invalid
    return {
      valid: otherActiveSessions === 0,
      sessionToken: currentSession.sessionToken,
    };
  } catch (error) {
    console.error("Error checking session validity:", error);
    return { valid: false };
  }
}
