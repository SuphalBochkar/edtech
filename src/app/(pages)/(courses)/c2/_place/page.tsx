import TestTypes from "@/components/Courses/c2/TestTypes";
import { TestType } from "@/lib/data-c2";

const page = () => {
  return <TestTypes testType={TestType.PlaceMe} path="place" />;
};

export default page;
