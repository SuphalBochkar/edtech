"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NotifyBase } from "@/components/Notifications/Notify";
import AllTests from "@/components/Courses/c1/AllTests";
import Loading from "./loading";
import { CustomMessageC1 } from "@/components/Notifications/CustomMessage";

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
      <NotifyBase CustomMessage={CustomMessageC1} />
    </>
  );
};

export default Page;
