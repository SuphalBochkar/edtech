// src/components/Tests/TestPageComponent.tsx

import React, { Suspense } from "react";
import { Course, Status } from "@/lib/types";
import ErrorPage from "@/components/Pricing/ErrorPage";
import AnswerPage from "@/components/Tests/AnswerPage";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import JsonLoading from "./JsonLoading";
import { prisma } from "@/lib/prisma";

interface TestPageProps {
  fetchData: () => string | null | undefined | Status;
}

export default async function TestPageComponent({ fetchData }: TestPageProps) {
  const testId = fetchData();
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  if (testId === Status.Paid) {
    redirect("/pricing");
  }

  if (
    testId === undefined ||
    testId === null ||
    testId === Status.NotAvailable
  ) {
    return (
      <div className="text-foreground">
        <ErrorPage text="We couldn't find the data you're looking for. Please try again later." />
      </div>
    );
  }

  if (testId === Status.Updating) {
    return (
      <div className="text-foreground">
        <ErrorPage
          status={Status.Updating}
          text="We're currently updating the data. Please check back in a few moments."
        />
      </div>
    );
  }

  /*

  model User {
    id        String    @id @default(auto()) @map("_id") @db.ObjectId
    name      String?
    email     String    @unique
    image     String?
    expireAt  DateTime?
    paid      Boolean   @default(false)
    createdAt DateTime  @default(now())
    payments  Payment[] @relation("UserPayments")
    courses   Course[]
}
   */

  const userCourses = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      courses: true,
    },
  });

  const isAuthorized = userCourses?.courses.includes(Course.Course1_Hit);

  if (!isAuthorized) {
    redirect("/pricing");
    return;
  }

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseURL}/api/hitbullseye/getdata/${testId}`);

  if (!response.ok) {
    console.error("Error fetching data:", response.status, response.statusText);
    const errorText = await response.text();
    console.error("Response body:", errorText);
    return (
      <div className="text-foreground">
        <ErrorPage text="We couldn't find the data you're looking for. Please try again later." />
      </div>
    );
  }

  const serverData = await response.json();
  const myData = serverData?.data;

  return (
    <Suspense fallback={<JsonLoading />}>
      <div className="text-foreground">
        {isAuthorized && <AnswerPage data={myData} />}
      </div>
    </Suspense>
  );
}
