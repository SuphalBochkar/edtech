"use client";

import { useSession } from "next-auth/react";
import AllTests from "@/components/Tests/AllTests";
import WelcomeMsg from "@/components/WelcomeMsg";
import Blobs from "@/components/Blobs";

const Page = () => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <div className="flex flex-col relative overflow-hidden">
      <Blobs />
      <div className="flex flex-col align-middle justify-center items-center content-center">
        <WelcomeMsg name={user?.name || "User"} isPaid={user?.paid || false} />
        <AllTests />
      </div>

      {user && user?.email === process.env.NEXT_PUBLIC_MY_EMAIL! && (
        <div className="w-full">
          <p className="text-3xl text-center">
            Business Name: {process.env.NEXT_PUBLIC_MY_NAME!}
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
