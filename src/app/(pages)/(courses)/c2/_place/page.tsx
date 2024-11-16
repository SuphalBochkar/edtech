import TestTypes from "@/components/Courses/c2/TestTypes";
import { Course } from "@/lib/data";

const page = () => {
  return <TestTypes testType={Course.Course1AE} path="place" />;
};

export default page;
