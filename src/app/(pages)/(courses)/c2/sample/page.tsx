import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TestDisplay from "@/components/Courses/c2/TestDisplay";
import { sampleTestData } from "@/lib/data-c2";

const Page: React.FC = async () => {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    redirect("/");
    return null;
  }

  return (
    <div>
      <TestDisplay testItem={sampleTestData} />
    </div>
  );
};

export default Page;
