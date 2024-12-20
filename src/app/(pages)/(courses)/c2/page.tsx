"use client";

import { Suspense } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Loading from "./loading";
import { NotifyC2 } from "@/components/Notifications/Notify";

const DynamicAllTests = dynamic(
  () => import("@/components/Courses/c2/AllTests"),
  {
    loading: () => <></>,
  }
);

const Page = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />;

  return (
    <>
      <div className="flex flex-col relative overflow-hidden">
        {session?.user && (
          <div className="flex flex-col align-middle justify-center items-center content-center">
            <Suspense fallback={<Loading />}>
              <DynamicAllTests />
            </Suspense>
          </div>
        )}
      </div>
      <NotifyC2 />
    </>
  );
};

export default Page;
