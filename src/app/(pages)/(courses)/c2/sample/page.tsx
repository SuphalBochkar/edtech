import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TestDisplay from "@/components/Courses/c2/TestDisplay";
import { sampleTestData } from "@/lib/data-c2";
import { AUTH_OPTIONS } from "@/lib/auth";

const Page: React.FC = async () => {
  const session = await getServerSession(AUTH_OPTIONS);
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
