import { Course } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function getUserFromDb(email: string, password: string) {
  try {
    email = email.toLowerCase();
    const existedUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!existedUser) {
      return {
        success: false,
        message:
          "No account found with this email address. Please check your email or sign up for a new account.",
      };
    }

    if (!existedUser.password) {
      return {
        success: false,
        message:
          "This account uses social login. Please sign in with your social provider instead.",
      };
    }

    const isPasswordMatches = bcrypt.compareSync(
      password,
      existedUser.password
    );

    if (!isPasswordMatches) {
      return {
        success: false,
        message: "Password is incorrect.",
      };
    }

    return {
      success: true,
      data: {
        id: existedUser.id,
        name: existedUser.email,
        email: existedUser.email,
        image: existedUser.image,
        paid: existedUser.paid,
        expireAt: existedUser.expireAt,
        courses: existedUser.courses,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function saveCourseRegistration(
  userId: string,
  courses: Course[],
  paymentProofUrl: string,
  totalAmount: number
) {
  try {
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courses,
        paymentProofUrl,
        totalAmount,
        status: "PENDING",
      },
    });

    return {
      success: true,
      message: "Registration submitted successfully",
      enrollment,
    };
  } catch (error) {
    console.error("Error in saveCourseRegistration:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to submit registration",
    };
  }
}

export async function updateEnrollmentStatus(
  enrollmentId: string,
  status: "APPROVED" | "REJECTED" | "PENDING"
) {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      return {
        success: false,
        message: "Enrollment not found",
      };
    }

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { status },
    });

    if (status === "APPROVED") {
      await prisma.user.update({
        where: { id: enrollment.userId },
        data: {
          courses: {
            push: enrollment.courses,
          },
        },
      });
    }

    return {
      success: true,
      message: `Enrollment ${status.toLowerCase()} successfully`,
      enrollment: updatedEnrollment,
    };
  } catch (error) {
    console.error("Error in updateEnrollmentStatus:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to submit registration",
    };
  }
}

export async function getEnrollments(
  status?: "PENDING" | "APPROVED" | "REJECTED"
) {
  try {
    const where = status ? { status } : {};

    const enrollments = await prisma.enrollment.findMany({
      where,
      include: {
        user: {
          select: {
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

    return {
      success: true,
      enrollments,
    };
  } catch (error) {
    console.error("Error in getEnrollments:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch enrollments",
    };
  }
}

export async function getUserEnrollments(userId: string) {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      enrollments,
    };
  } catch (error) {
    console.error("Error in getUserEnrollments:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch user enrollments",
    };
  }
}
