"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Content from "@/components/Main/Content";
import MainLoading from "./MainLoading";

const AuthContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.replace("/home");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <MainLoading />;
  }

  return status === "unauthenticated" ? <Content /> : null;
};

export default AuthContent;
