// import { getLevelData } from "@/actions/keyData";
// import LevelCard from "@/components/Tests/LevelCard";
// import { notFound } from "next/navigation";

// export default async function LevelPage({
//   params,
// }: {
//   params: { level: string };
// }) {
//   const levelData = await getLevelData(params.level);

//   if (!levelData) {
//     notFound();
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Level {params.level} Tests</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <LevelCard
//           level={params.level}
//           type="Aptitude"
//           tests={levelData.aptitude}
//         />
//         <LevelCard
//           level={params.level}
//           type="Programming"
//           tests={levelData.programming}
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { getLevelData } from "@/actions/keyData";
import { useRouter } from "next/navigation";
import React from "react";

const Page = ({
  params,
}: {
  params: {
    level: string;
  };
}) => {
  const router = useRouter();
  const data = getLevelData(params.level);

  if (!data) {
    router.push("/test/");
  }

  return (
    <div className="text-foreground">
      This is level\[level] Page.tsx
      <div>{JSON.stringify(data, null, 3)}</div>
    </div>
  );
};

export default Page;
