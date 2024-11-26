import Blobs from "@/components/Main/Blobs";
import { getLevelTypeData } from "@/actions/keyData";
import LevelTypeCard from "./LevelTypeCard";
import { Course, CourseNames } from "@/lib/data";
// import { redirect } from "next/navigation";

const TestTypes = ({ testType, path }: { testType: Course; path: string }) => {
  const data = getLevelTypeData(testType);

  //   if (!data) return redirect("/c2");

  return (
    <div>
      <Blobs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:m-5 mb-4 flex justify-center">
          {CourseNames[testType]}
        </h1>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {data && <LevelTypeCard tests={data} path={path} />}
        </div>
      </div>
    </div>
  );
};

export default TestTypes;
