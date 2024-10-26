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
    </div>
  );
};

export default Page;
