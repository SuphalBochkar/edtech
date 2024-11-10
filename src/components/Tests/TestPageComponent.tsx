// src/components/Tests/TestPageComponent.tsx

import React, { Suspense } from "react";
import ErrorPage from "@/components/Pricing/ErrorPage";
import AnswerPage from "@/components/Tests/AnswerPage";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import JsonLoading from "./JsonLoading";
import { Status } from "@/lib/types";
// import { Course, Status } from "@/lib/types";
// import { prisma } from "@/lib/prisma";

interface TestPageProps {
  fetchData: () => string | null | undefined | Status;
}

export default async function TestPageComponent({ fetchData }: TestPageProps) {
  const testId = fetchData();
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    redirect("/");
  }

  //   if (testId === Status.Paid) {
  //     redirect("/pricing");
  //   }

  //   const userCourses = await prisma.user.findFirst({
  //     where: {
  //       email: session.user.email,
  //     },
  //     select: {
  //       courses: true,
  //     },
  //   });

  //   const isAuthorized = userCourses?.courses.includes(Course.Course1_Hit);

  //   if (!isAuthorized) {
  //     redirect("/pricing");
  //     return;
  //   }

  if (
    testId === undefined ||
    testId === null ||
    testId === Status.NotAvailable
  ) {
    return (
      <div className="text-foreground">
        <ErrorPage text="We couldn't find the data. Please try again later." />
      </div>
    );
  }

  if (testId === Status.Updating) {
    return (
      <div className="text-foreground">
        <ErrorPage status={Status.Updating} text="Will be updating soon." />
      </div>
    );
  }

  const testIds = testId.split("-");
  const allDataArrays = await Promise.all(
    testIds.map((id) => fetchTestData(id))
  );
  const combinedData = allDataArrays.flat();

  return (
    <Suspense fallback={<JsonLoading />}>
      <div className="text-foreground">
        {/* {isAuthorized && <AnswerPage data={combinedData} />} */}
        {<AnswerPage data={combinedData} />}
      </div>
    </Suspense>
  );
}

const fetchTestData = async (testId: string) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseURL}/api/course1/getdata/${testId}`);

  if (!response.ok) {
    console.error("Error fetching data:", response.status, response.statusText);
    const errorText = await response.text();
    console.error("Response body:", errorText);
    return [];
  }

  const serverData = await response.json();
  return serverData?.data || [];
};
