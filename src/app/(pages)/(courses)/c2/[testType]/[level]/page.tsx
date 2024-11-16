// src/app/(pages)/(courses)/c2/n2n-cpp/[level]/page.tsx

import { getTypeTestId } from "@/actions/keyData";
import JsonFetch from "@/components/Courses/c2/JsonFetch";
import { CourseIds } from "@/lib/data";

export default function Page({
  params,
}: {
  params: {
    testType: string;
    level: string;
  };
}) {
  const fetchData = () =>
    getTypeTestId(CourseIds[params?.testType], params.level as string);

  return (
    <JsonFetch fetchData={fetchData} courseType={CourseIds[params?.testType]} />
  );
}
