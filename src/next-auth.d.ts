import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    paid: boolean;
    expireAt: Date;
    courses: string[];
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      paid: boolean;
      courses: string[];
      expireAt: Date;
    };
    expires: string;
  }

  interface JWT {
    id: string;
    paid: boolean;
    expireAt: Date;
    courses: string[];
  }
}
