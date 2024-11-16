"use client";

import { Suspense } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Blobs from "@/components/Blobs";
import Loading from "./loading";
import Notify from "@/components/Notifications/Notify";

const DynamicAllTests = dynamic(
  () => import("@/components/Courses/c1/AllTests"),
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
        <Blobs />
        {session?.user && (
          <div className="flex flex-col align-middle justify-center items-center content-center">
            <Suspense fallback={<Loading />}>
              <DynamicAllTests />
            </Suspense>
          </div>
        )}
      </div>
      <Notify />
    </>
  );
};

export default Page;
