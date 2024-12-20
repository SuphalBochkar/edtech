import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Course, CourseIds } from "@/lib/data";
import { encodeData } from "@/lib/utils";
import { getTypeTestId } from "@/actions/keyData";
import { Status, TestItem } from "@/lib/types";
import ErrorPage from "@/components/Courses/ErrorPage";
import TestDisplay from "@/components/Courses/c2/TestDisplay";
import { AUTH_PROVIDERS } from "@/lib/auth";

export default async function Page({
  params,
}: {
  params: {
    testType: string;
    type: "mcq" | "code";
    level: string;
  };
}) {
  const session = await getServerSession(AUTH_PROVIDERS);

  if (!session?.user?.email) {
    redirect("/");
    return null;
  }

  const courseType = CourseIds[params?.testType];

  if (!courseType) {
    redirect("/c2");
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      courses: true,
    },
  });

  const isAuthorized =
    user?.courses.includes(courseType) ||
    user?.courses.includes(Course.Course2Perfect) ||
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

  if (
    !allDataArrays ||
    !Array.isArray(allDataArrays) ||
    allDataArrays.length === 0 ||
    allDataArrays.some((arr) => !Array.isArray(arr) || arr.length === 0)
  ) {
    return (
      <div className="text-foreground">
        <ErrorPage text="No test data available!" />
      </div>
    );
  }

  // @ts-expect-error - We are sure that the data is not empty
  const combinedData: TestItem[] = allDataArrays.flat();

  if (
    !combinedData ||
    !Array.isArray(combinedData) ||
    combinedData.length === 0
  ) {
    return (
      <div className="text-foreground">
        <ErrorPage text="No test data available!" />
      </div>
    );
  }

  const finalData = {
    Level: combinedData[0]?.Level,
    levelData: combinedData.flatMap((data) => data?.levelData),
    testType: combinedData[0]?.testType,
  };

  return (
    session &&
    session.user &&
    isAuthorized && (
      <>
        {/* {combinedData.map((testItem, index) => ( */}
        <TestDisplay testItem={finalData} />
        {/* ))} */}
      </>
    )
  );
}
