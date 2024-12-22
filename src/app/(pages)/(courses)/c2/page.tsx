"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NotifyC2 } from "@/components/Notifications/Notify";
import AllTests from "@/components/Courses/c2/AllTests";
import Loading from "./loading";

const Page = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading" || !session) {
    return <Loading />;
  }

  const emails = process.env.NEXT_PUBLIC_MY_EMAIL!.split("-");
  const isAdmin = emails.includes(session.user?.email as string);

  if (isAdmin) {
    redirect("/home");
  }

  return (
    <>
      <div className="flex flex-col relative overflow-hidden">
        {session?.user && (
          <div className="flex flex-col align-middle justify-center items-center content-center">
            <AllTests />
          </div>
        )}
      </div>
      <NotifyC2 />
    </>
  );
};

export default Page;
