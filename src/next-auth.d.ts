// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    paid: boolean;
    expireAt?: Date;
    courses?: Course[];
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      paid?: boolean;
      courses?: Course[];
    };
    expires: string;
  }

  interface JWT {
    id: string;
    paid: boolean;
    expireAt: Date;
    courses: Course[];
  }
}
