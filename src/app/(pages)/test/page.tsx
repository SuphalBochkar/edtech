"use client";

import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import AllTests from "@/components/Tests/AllTests";
import WelcomeMsg from "@/components/WelcomeMsg";
import LevelComponent from "@/ui/Aceternity/LevelComponent";

const Page = () => {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

  return (
    <div className="max-h-screen w-screen">
      <NavBar />
      <div className="flex flex-col align-middle justify-center items-center content-center">
        <WelcomeMsg name={user?.name || "User"} isPaid={user?.paid || false} />
        <AllTests />
      </div>
      <LevelComponent />
    </div>
  );
};

export default Page;
