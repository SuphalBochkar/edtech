"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google");
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) router.push("/test");
  }, [status, session, router]);

  return (
    <nav className="sticky wrapper top-0 z-50 flex items-center justify-center gap-2 py-6 w-full text-[#f9fafb]">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          damping: 10,
        }}
        className="flex w-[90%] sm:w-[70%] justify-between backdrop-blur-lg border dark:border-gray-800 p-6 rounded-2xl"
      >
        <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
          <Image
            src={"https://avatars.githubusercontent.com/u/114354506?v=4"}
            alt="Logo"
            width={300}
            height={200}
            className="rounded-full size-10"
          />
          <span className="text-lg md:text-2xl font-bold tracking-tight hidden text-purple-800 dark:text-foreground md:block">
            Finish66
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <ThemeSwitch />
          <Link
            href={"/pricing"}
            className="md:flex align-middle hidden md:visible"
          >
            <span className="text-base sm:text-xl font-medium sm:font-bold text-foreground">
              Pricing
            </span>
          </Link>
          <div className="flex items-center gap-8">
            {!user ? (
              <button
                className={`inline-flex items-center justify-center text-sm font-medium text-background bg-foreground h-10 rounded-md px-8 transition duration-300 ease-in-out ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-gray-900"
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
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full "
                />
                <button
                  onClick={() => signOut()}
                  className="text-white p-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <LogOut size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default NavBar;
