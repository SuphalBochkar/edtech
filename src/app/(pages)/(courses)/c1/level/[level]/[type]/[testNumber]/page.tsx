// src/app/(pages)/(courses)/c1/level/[level]/[type]/[testNumber]/page.tsx

import { getTestData } from "@/actions/keyData";
import JsonFetch from "@/components/Courses/c1/JsonFetch";
import { Course } from "@/lib/data";

export default function Page({
  params,
}: {
  params: {
    level: string;
    type: string;
    testNumber: string;
  };
}) {
  const { level, type, testNumber } = params;
  const fetchData = () => getTestData(level, type, testNumber);
  return <JsonFetch fetchData={fetchData} courseType={Course.Course1Level} />;
}

// import { getTestData } from "@/actions/keyData";
// import ErrorPage from "@/components/Pricing/ErrorPage";
// import { Status } from "@/lib/types";
// import React, { Suspense } from "react";
// import { redirect } from "next/navigation";
// import AnswerPage from "@/components/Tests/AnswerPage";
// import Loading from "./loading";
// import { getServerSession } from "next-auth";

// export default async function Page({
//   params,
// }: {
//   params: {
//     level: string;
//     type: string;
//     testNumber: string;
//   };
// }) {
//   const { level, type, testNumber } = params;
//   const testId = getTestData(level, type, testNumber);

//   const session = await getServerSession();

//   if (!session) {
//     redirect("/");
//   }

//   if (testId === Status.Paid) {
//     redirect("/pricing");
//   }

//   if (
//     testId === undefined ||
//     testId === null ||
//     testId === Status.NotAvailable
//   ) {
//     return (
//       <div className="text-foreground">
//         <ErrorPage text="We couldn't find the data you're looking for. Please try again later." />
//       </div>
//     );
//   }

//   if (testId === Status.Updating) {
//     return (
//       <div className="text-foreground">
//         <ErrorPage
//           status={Status.Updating}
//           text="We're currently updating the data. Please check back in a few moments."
//         />
//       </div>
//     );
//   }

//   const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//   const response = await fetch(`${baseURL}/api/hitbullseye/getdata/${testId}`);

//   if (!response.ok) {
//     console.error("Error fetching data:", response.status, response.statusText);
//     const errorText = await response.text();
//     console.error("Response body:", errorText);
//     return (
//       <div className="text-foreground">
//         <ErrorPage text="We couldn't find the data you're looking for. Please try again later." />
//       </div>
//     );
//   }

//   const serverData = await response.json();
//   const myData = serverData?.data;

//   return (
//     <Suspense fallback={<Loading />}>
//       <div className="text-foreground">
//         <AnswerPage data={myData} />
//       </div>
//     </Suspense>
//   );
// }
