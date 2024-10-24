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

import React from "react";

const page = ({ params }: { params: object }) => {
  return (
    <div className="text-background">
      This is level\[level] page.tsx
      <div>{JSON.stringify(params)}</div>
    </div>
  );
};

export default page;
