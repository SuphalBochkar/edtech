import React from "react";
import { getPracticeTestsData } from "@/actions/keyData";
import JsonPage from "@/components/Tests/JsonPage";

export default async function Page({
  params,
}: {
  params: {
    practice: string;
    type: string;
  };
}) {
  const { practice, type } = params;
  const testId = getPracticeTestsData(practice, type);
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
    <div className="">
      <JsonPage data={myData} />
    </div>
  );
}
