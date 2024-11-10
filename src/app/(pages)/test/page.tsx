"use client";

import { Suspense } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Blobs from "@/components/Blobs";
import Loading from "./loading";

import Notify from "@/components/Notifications/Notify";

const DynamicAllTests = dynamic(() => import("@/components/Tests/AllTests"), {
  loading: () => <Loading />,
});
const DynamicWelcomeMsg = dynamic(() => import("@/components/WelcomeMsg"), {
  loading: () => <></>,
});
import Footer from "@/components/Footer";

const Page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col relative overflow-hidden">
        <Blobs />
        {session?.user && (
          <div className="flex flex-col align-middle justify-center items-center content-center">
            <Suspense fallback={<Loading />}>
              <DynamicWelcomeMsg
                name={session.user.name || "User"}
                isPaid={session.user.paid || false}
              />
              <DynamicAllTests />
            </Suspense>
          </div>
        )}
        <Notify />
      </div>
      <Notify />
      {session &&
        session?.user &&
        session?.user.email === process.env.NEXT_PUBLIC_MY_EMAIL! && <Footer />}
    </>
  );
};

export default Page;
