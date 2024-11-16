import { EXPIRE_DAYS } from "@/lib/types";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ForceLogout() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated" && session?.expires) {
      const expirationDate = new Date(session.expires);
      const currentDate = new Date();
      const diffInMs = expirationDate.getTime() - currentDate.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      if (diffInDays > EXPIRE_DAYS) {
        signOut();
        router.push("/");
      }
    }
  }, [session, status, router]);

  return null;
}
