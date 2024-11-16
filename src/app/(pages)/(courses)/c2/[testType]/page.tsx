"use client";

import TestTypes from "@/components/Courses/c2/TestTypes";
import { Course, CourseIds } from "@/lib/data";
import { useRouter } from "next/navigation";

const Page = ({
  params,
}: {
  params: {
    testType: string;
  };
}) => {
  const router = useRouter();
  const { testType } = params;

  const currentCourse: Course | undefined = CourseIds[testType];
  if (!currentCourse) {
    router.push("/c2");
    return null;
  }

  return <TestTypes testType={currentCourse} path={testType} />;
};

export default Page;
