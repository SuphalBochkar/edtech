"use client";

import Blobs from "@/components/Blobs";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Loading from "./loading";

import React from "react";
import Footer from "@/components/Footer";

const DynamicAllCourses = dynamic(
  () => import("@/components/Courses/AllCourses"),
  {
    loading: () => <></>,
  }
);
const DynamicWelcomeMsg = dynamic(() => import("@/components/WelcomeMsg"), {
  loading: () => <></>,
});

const Page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  const emails = process.env.NEXT_PUBLIC_MY_EMAIL!.split("-");

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
              <DynamicAllCourses />
            </Suspense>
          </div>
        )}
      </div>
      {session &&
        session?.user &&
        emails.includes(session?.user.email as string) && <Footer />}
    </>
  );
};

export default Page;
