import { getTestData } from "@/actions/keyData";
import JsonPage from "@/components/Tests/JsonPage";
import React from "react";

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
  const response = await fetch(
    `http://localhost:3000/api/hitbullseye/getdata/${testId}`
  );

  if (!response.ok) {
    console.error("Error fetching data:", response.status, response.statusText);
    const errorText = await response.text();
    console.error("Response body:", errorText);
    return;
  }

  const data = await response.json();
  const myData = data?.data;

  return (
    <div className="text-foreground">
      <JsonPage data={myData} />
    </div>
  );
}
