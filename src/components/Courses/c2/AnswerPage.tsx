"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import JsonPage from "./JsonPage";
import { JsonValue } from "@prisma/client/runtime/library";

const AnswerPage = ({ data }: { data: JsonValue[] }) => {
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
