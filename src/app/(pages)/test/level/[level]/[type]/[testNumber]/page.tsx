import { getTestData } from "@/actions/keyData";
import ErrorPage from "@/components/Pricing/ErrorPage";
import { Status } from "@/lib/types";
import React from "react";
import { redirect } from "next/navigation";
import AnswerPage from "@/components/Tests/AnswerPage";

export default async function Page({
  params,
}: {
  params: {
    level: string;
    type: string;
    testNumber: string;
  };
}) {
  const { level, type, testNumber } = params;
  const testId = getTestData(level, type, testNumber);

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
    <div className="text-foreground">
      <AnswerPage data={myData} />
    </div>
  );
}
