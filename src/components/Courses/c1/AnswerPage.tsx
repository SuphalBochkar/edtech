"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { DataItem } from "@/lib/types";
import JsonPage from "./JsonPage";
import { useRouter } from "next/navigation";

const AnswerPage = ({ data, email }: { data: DataItem[]; email: string }) => {
  const router = useRouter();
  const { data: sessionData, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const userData = sessionData?.user;

  useEffect(() => {
    if (status === "loading") return;
  }, [status, userData, router]);

  return <>{userData && <JsonPage data={data} email={email} />}</>;
};

export default AnswerPage;
