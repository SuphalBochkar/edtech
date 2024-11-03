"use client";

import AllTests from "@/components/Tests/AllTests";
import Blobs from "@/components/Blobs";
import WelcomeMsg from "@/components/WelcomeMsg";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col relative overflow-hidden">
      <Blobs />
      {session?.user && (
        <div className="flex flex-col align-middle justify-center items-center content-center">
          <WelcomeMsg
            name={session.user.name || "User"}
            isPaid={session.user.paid || false}
          />
          <AllTests />
        </div>
      )}
    </div>
  );
};

export default Page;
