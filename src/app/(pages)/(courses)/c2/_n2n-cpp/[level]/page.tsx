// src/app/(pages)/(courses)/c2/n2n-cpp/[level]/page.tsx

import { getTypeTestId } from "@/actions/keyData";
import JsonFetch from "@/components/Courses/c2/JsonFetch";
import { Course } from "@/lib/data";

export default function Page({ params }: { params: { level: string } }) {
  const fetchData = () =>
    getTypeTestId(Course.Course2N2NCPP, params.level as string);

  return <JsonFetch fetchData={fetchData} courseType={Course.Course2N2NCPP} />;
}
