import TestTypes from "@/components/Courses/c2/TestTypes";
import { TestType } from "@/lib/data-c2";

const page = () => {
  return <TestTypes testType={TestType.V5} path="v5" />;
};

export default page;
