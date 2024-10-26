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
import Blobs from "@/components/Blobs";
import LevelCard from "@/components/Tests/LevelCard";
import { useEffect } from "react";
import CustomBreadcrumb from "@/components/Tests/CustomBreadcrumb";

export default function Page({
  params,
}: {
  params: {
    level: string;
  };
}) {
  const router = useRouter();
  const data = getLevelData(params.level);

  useEffect(() => {
    if (!data) {
      router.push("/test/");
    }
  }, [data, router]);

  if (!data) {
    return <div>{""}</div>;
  }

  return (
    <div>
      <Blobs />
      <div className="flex flex-col justify-center items-center py-4 md:py-8">
        <div className="w-[90vw] lg:w-[70vw] py-4 md:py-10 rounded-lg overflow-hidden">
          <div className="p-4 md:justify-start">
            <CustomBreadcrumb />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
            <div className="space-y-4">
              <LevelCard
                level={params.level}
                type="Aptitude"
                tests={data?.aptitude}
              />
            </div>
            <div className="space-y-4">
              <LevelCard
                level={params.level}
                type="Programming"
                tests={data?.programming}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
