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
      name: string;
      image?: string;
      paid: boolean;
      courses: string[];
      expireAt: Date;
    }
  }

  interface JWT {
    id: string;
    paid: boolean;
    expireAt: Date;
    courses: string[];
  }
}
