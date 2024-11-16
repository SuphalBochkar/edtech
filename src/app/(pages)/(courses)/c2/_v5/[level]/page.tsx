// src/app/(pages)/(courses)/c2/v5/[level]/page.tsx

import { getTypeTestId } from "@/actions/keyData";
import { TestType } from "@/lib/data-c2";
import { Course } from "@/lib/data";
import JsonFetch from "@/components/Courses/c2/JsonFetch";

export default function Page({ params }: { params: { level: string } }) {
  const fetchData = () => getTypeTestId(TestType.V5, params.level as string);
  return (
    <JsonFetch
      fetchData={fetchData}
      testType={TestType.V5}
      courseType={Course.Course2V5}
    />
  );
}
