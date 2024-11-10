"use client";

import { useSession } from "next-auth/react";
import AllTests from "@/components/Tests/AllTests";
import WelcomeMsg from "@/components/WelcomeMsg";
import Blobs from "@/components/Blobs";
import Footer from "@/components/Footer";

const Page = () => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <>
      <div className="flex flex-col">
        <Blobs />
        <main className="flex-grow flex flex-col items-center z-10 relative">
          <WelcomeMsg
            name={user?.name || "User"}
            isPaid={user?.paid || false}
          />
          <AllTests />
        </main>
      </div>
      {user && user.email === process.env.NEXT_PUBLIC_MY_EMAIL! && <Footer />}
    </>
  );
};

export default Page;
