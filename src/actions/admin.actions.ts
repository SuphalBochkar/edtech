"use server";

import { prisma } from "@/lib/prisma";
import { Course } from "@/lib/data";

type UserResponse = {
  user?: {
    image: string;
    name: string;
    email: string;
    createdAt: string;
    courses: Course[];
    payments: {
      id: string;
      course: string;
      status: string;
      razorpay_payment_id: string | null;
      createdAt: string | null;
      amount: number;
    }[];
    queries: {
      id: string;
      message: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
  error?: string;
};

export async function getUserDetails(search: string): Promise<UserResponse> {
  try {
    if (!search) {
      return { error: "Search term is required" };
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { contains: search, mode: "insensitive" } },
          { name: { contains: search, mode: "insensitive" } },
        ],
      },
      select: {
        image: true,
        name: true,
        email: true,
        createdAt: true,
        courses: true,
        payments: {
          select: {
            id: true,
            course: true,
            status: true,
            razorpay_payment_id: true,
            createdAt: true,
            amount: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        queries: {
          select: {
            id: true,
            message: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Convert dates to strings
    const formattedUser = {
      ...user,
      image: user.image || "",
      name: user.name || "",
      createdAt: user.createdAt.toISOString(),
      courses: user.courses as unknown as Course[],
      payments: user.payments.map((payment) => ({
        ...payment,
        course: payment.course as unknown as string,
        createdAt: payment.createdAt?.toISOString() || null,
      })),
      queries: user.queries.map((query) => ({
        ...query,
        createdAt: query.createdAt.toISOString(),
        updatedAt: query.updatedAt.toISOString(),
      })),
    };

    return { user: formattedUser };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}

type QueryWithUser = {
  id: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string | null;
    email: string;
  } | null;
};

type QueriesResponse = {
  queries?: QueryWithUser[];
  error?: string;
};

export async function getQueries(): Promise<QueriesResponse> {
  try {
    const queries = await prisma.query.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    const formattedQueries = queries.map((query) => ({
      ...query,
      createdAt: query.createdAt.toISOString(),
      updatedAt: query.updatedAt.toISOString(),
    }));

    return { queries: formattedQueries };
  } catch (error) {
    console.error("Error fetching queries:", error);
    return { error: "Failed to fetch queries" };
  }
}

type UpdateQueryResponse = {
  query?: QueryWithUser;
  error?: string;
};

import { QueryStatus } from "@prisma/client";

export async function updateQueryStatus(
  id: string,
  status: QueryStatus
): Promise<UpdateQueryResponse> {
  try {
    const updatedQuery = await prisma.query.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    return {
      query: {
        ...updatedQuery,
        createdAt: updatedQuery.createdAt.toISOString(),
        updatedAt: updatedQuery.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error updating query status:", error);
    return { error: "Failed to update query status" };
  }
}

type SessionWithUser = {
  id: string;
  sessionToken: string;
  expires: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
};

type SessionsResponse = {
  sessions?: SessionWithUser[];
  error?: string;
};

export async function getActiveSessions(): Promise<SessionsResponse> {
  try {
    const sessions = await prisma.session.findMany({
      where: {
        expires: {
          gt: new Date(), // Only get sessions that haven't expired
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedSessions = sessions.map((session) => ({
      ...session,
      expires: session.expires.toISOString(),
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
    }));

    return { sessions: formattedSessions };
  } catch (error) {
    console.error("Error fetching active sessions:", error);
    return { error: "Failed to fetch active sessions" };
  }
}

type PaymentWithUser = {
  id: string;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  razorpay_order_id: string;
  course: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string | null;
  user: {
    name: string | null;
    email: string;
  };
};

type PaymentsResponse = {
  payments?: PaymentWithUser[];
  error?: string;
};

export async function getPayments(): Promise<PaymentsResponse> {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedPayments = payments.map((payment) => ({
      ...payment,
      createdAt: payment.createdAt?.toISOString() || null,
    }));

    return { payments: formattedPayments };
  } catch (error) {
    console.error("Error fetching payments:", error);
    return { error: "Failed to fetch payments" };
  }
}
