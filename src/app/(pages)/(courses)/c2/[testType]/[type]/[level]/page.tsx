import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Course, CourseIds } from "@/lib/data";
import { encodeData } from "@/lib/utils";
import { getTypeTestId } from "@/actions/keyData";
import { Status, TestItem } from "@/lib/types";
import ErrorPage from "@/components/Courses/ErrorPage";
import TestDisplay from "@/components/Courses/c2/TestDisplay";

export default async function Page({
  params,
}: {
  params: {
    testType: string;
    type: "mcq" | "code";
    level: string;
  };
}) {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    redirect("/");
    return null;
  }

  const userCourses = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
    select: {
      courses: true,
    },
  });

  const courseType = CourseIds[params?.testType];

  const isAuthorized =
    userCourses?.courses.includes(courseType) ||
    userCourses?.courses.includes(Course.Course2Perfect) ||
    false;

  if (!isAuthorized) {
    const encodedData = encodeData(courseType);
    redirect(`/pricing/${encodedData}`);
    return null;
  }

  const testId = getTypeTestId(
    CourseIds[params?.testType],
    params.type,
    params.level as string
  );

  if (!testId || testId === Status.NotAvailable) {
    return (
      <div className="text-foreground">
        <ErrorPage text="No test available!" />
      </div>
    );
  }

  if (testId === Status.Updating) {
    return (
      <div className="text-foreground">
        <ErrorPage status={Status.Updating} text="Will be updating soon." />
      </div>
    );
  }

  const testIds = testId?.split("-") || [];
  const allDataArrays = await Promise.all(
    testIds.map(async (id: string) => {
      const testData = await prisma.perfectice.findFirst({
        where: { id },
      });

      return testData?.data || [];
    })
  );

  // @ts-expect-error - We are sure that the data is not empty
  const combinedData: TestItem[] = allDataArrays.flat();

  const finalData = {
    Level: combinedData[0].Level,
    levelData: combinedData.flatMap((data) => data.levelData),
    testType: combinedData[0].testType,
  };

  return (
    session &&
    session.user &&
    isAuthorized && (
      <>
        {/* <h1 className="text-3xl font-bold mb-6">
          {params.testType} - Level {params.level} - {params.type.toUpperCase()}{" "}
          Test
        </h1> */}
        {/* {combinedData.map((testItem, index) => ( */}
        <TestDisplay testItem={finalData} />
        {/* ))} */}
      </>
    )
  );
}
