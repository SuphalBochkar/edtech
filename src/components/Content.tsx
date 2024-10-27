"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import google from "@/assets/google.svg";
import Image from "next/image";

const Content = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated" && session?.user) router.push("/test");
  }, [status, session, router]);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google");
    setLoading(false);
  };

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        damping: 10,
        delay: 0.3,
      }}
      initial={{ y: -20, opacity: 0 }}
      className="max-w-8xl px-4 pt-20 md:pt-40 sm:pt-52 flex flex-col gap-5 items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center">
        <span className="tracking-tighter text-2xl md:text-3xl text-center font-medium text-foreground">
          Welcome to
        </span>
        <h1 className="tracking-tighter text-6xl text-[#f9fafb] md:text-7xl xl:text-8xl text-center font-bold my-2">
          <span className="font-bold bg-gradient-to-b from-violet-300 to-violet-800 bg-clip-text text-transparent">
            Finish66
          </span>
          <span className="pl-4 block sm:inline text-foreground">EdTech</span>
        </h1>
      </div>
      <p className="text-foreground max-w-lg text-center tracking-tight md:text-lg font-light">
        A platform where you{"'"}ll find the right content to help you improve
        your skills and grow your knowledge.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleSignIn}
          className={`flex gap-2 md:gap-3 items-center text-sm sm:text-lg font-bold border border-transparent bg-gradient-to-r from-white to-gray-300 text-black px-4 py-4 md:px-6 md:py-3 rounded-lg transition-all duration-300 transform hover:from-gray-100 hover:to-white hover:scale-105 ${
            loading ? "cursor-not-allowed opacity-75" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            <>
              <Image src={google} alt="Google logo" width={20} height={20} />
              Sign in with Google
            </>
          )}
        </button>
        {/* <button
          onClick={() => router.push("/pricing")}
          className="bg-gradient-to-r from-violet-400 text-sm sm:text-lg to-violet-500 px-6 py-2 rounded-md text-white font-semibold tracking-tight hover:from-violet-500 hover:to-violet-900"
        >
          See Pricing
        </button> */}
        {/* <PricingButton /> */}
      </div>
    </motion.div>
  );
};
export default Content;
