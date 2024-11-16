"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { DataItem } from "@/lib/types";
import { useRouter } from "next/navigation";
import JsonPage from "./JsonPage";

const AnswerPage = ({ data }: { data: DataItem[] }) => {
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

  return <>{userData && <JsonPage data={data} />}</>;
};

export default AnswerPage;
