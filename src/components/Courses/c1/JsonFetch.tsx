// src/components/Courses/c1/JsonFetch.tsx

import React, { Suspense } from "react";
import ErrorPage from "@/components/Courses/ErrorPage";
import AnswerPage from "@/components/Courses/c1/AnswerPage";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import JsonLoading from "./JsonLoading";
import { DataItem, Status } from "@/lib/types";
import { Course } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { encodeData } from "@/lib/utils";
import { AUTH_OPTIONS } from "@/lib/auth";

interface DataArraysType {
  data: DataItem[];
}

interface TestPageProps {
  fetchData: () => string | null | undefined | Status;
  courseType: Course;
}

export default async function JsonFetch({
  fetchData,
  courseType,
}: TestPageProps) {
  const testId = fetchData();
  const session = await getServerSession(AUTH_OPTIONS);

  if (!session?.user?.email) {
    redirect("/");
    return null;
  }

  if (!testId) {
    redirect("/c1");
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      courses: true,
    },
  });

  const courseEnrollment = Course.Course1Hitbulls;
  const isAuthorized =
    user?.courses.includes(courseType) ||
    user?.courses.includes(courseEnrollment) ||
    false;

  if (!isAuthorized) {
    const encodedData = encodeData(courseEnrollment);
    redirect(`/pricing/${encodedData}`);
    return null;
  }

  if (testId === Status.NotAvailable) {
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

  const testIds = testId?.split("-") || [];

  // @ts-expect-error - We are sure that the data is not empty
  const allDataArrays: DataArraysType[] = await Promise.all(
    testIds.map(async (id: string) => {
      const testData = await prisma.hitbullseye.findFirst({
        where: { id },
      });
      return testData?.data;
    })
  );

  const mainData = allDataArrays.flatMap((test) => test?.data || []);

  return (
    session &&
    session.user &&
    isAuthorized && (
      <Suspense fallback={<JsonLoading />}>
        <div className="text-foreground">
          {isAuthorized && <AnswerPage data={mainData} />}
        </div>
      </Suspense>
    )
  );
}

// const fetchTestData = async (testId: string) => {
//   try {
//     const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//     const response = await fetch(`${baseURL}/api/c-hit/getdata/${testId}`, {
//       method: "POST",
//       cache: "no-store", // Disable caching for fresh data
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const serverData = await response.json();
//     return serverData?.data || [];
//   } catch (error) {
//     console.error("Error fetching test data:", error);
//     return [];
//   }
// };
