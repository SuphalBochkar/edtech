// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    paid: boolean;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      paid?: boolean;
    };
    expires: string; // or ISODateString if you have that type defined
  }
}
