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
  const response = await fetch(
    `http://localhost:3000/api/tester?level=${params.level}&type=${params.type}&testNumber=${params.testNumber}`
  );
  const data = await response.json();

  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="text-foreground">
      <h1>
        This is level {data.level} {data.type} {data.testNumber} page
      </h1>
      <p>{data.description}</p>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
