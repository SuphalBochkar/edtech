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
