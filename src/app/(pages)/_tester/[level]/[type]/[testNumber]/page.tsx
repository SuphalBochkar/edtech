// import { getTestData } from "@/actions/keyData";
// // import TestContent from "@/components/TestContent";
// import { notFound } from "next/navigation";

// export default async function TestPage({
//   params,
// }: {
//   params: { level: string; type: string; testNumber: string };
// }) {
//   const testData = await getTestData(
//     params.level,
//     params.type,
//     params.testNumber
//   );

// //   if (!testData) {
// //     notFound();
// //   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">
//         Level {params.level} {params.type} Test {params.testNumber}
//       </h2>
//       {/* <TestContent testData={testData} />
//        */}
//     </div>
//   );
// }


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
