"use client";

import { useSession } from "next-auth/react";
import Footer from "@/components/Main/Footer";
import PricingButton from "@/components/Pricing/PricingButton";
import WelcomeMsg from "@/components/Main/WelcomeMsg";
import AllCourses from "@/components/Courses/AllCourses";
import Loading from "./loading";
import MadeBy from "@/components/Main/MadeBy";

const Page = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return;
    },
  });

  if (status === "loading" || !session) {
    return <Loading />;
  }

  const emails = process.env.NEXT_PUBLIC_MY_EMAIL!.split("-");
  const isAdmin = emails.includes(session.user?.email as string);

  return (
    <>
      <div className="flex flex-col relative overflow-hidden">
        <div className="flex flex-col align-middle justify-center items-center content-center">
          <WelcomeMsg
            name={session.user?.name || "User"}
            isPaid={session.user?.paid || false}
          />
          {isAdmin && <PricingButton />}
          <AllCourses />
          <div className="mt-8 mb-4">
            <MadeBy />
          </div>
        </div>
      </div>
      {isAdmin && <Footer />}
    </>
  );
};

export default Page;
