import TestTypes from "@/components/Courses/c2/TestTypes";
import { Course } from "@/lib/data";

const page = () => {
  return <TestTypes testType={Course.Course2V5} path="v5" />;
};

export default page;
