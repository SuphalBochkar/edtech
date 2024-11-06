"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import defaultImage from "@/assets/default-avatar.png";
// import ForceLogout from "./ForceLogout";

const NavBar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google");
    setLoading(false);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    if (status === "loading") return;
    if (!user) {
      router.push("/");
    }
    if (pathname.includes("/pricing")) return;
  }, [user, status, router]);

  const relativeRoutes = ["/test/level/", "/test/practice/"];
  const isRelativeRoute = relativeRoutes.some((route) =>
    pathname.startsWith(route)
  );

  //   useEffect(() => {
  //     if (status === "authenticated" && session?.user) router.push("/test");
  //   }, [status, session, router]);

  return (
    <nav
      className={`${
        isRelativeRoute ? "relative" : "sticky"
      }  wrapper top-0 z-50 flex items-center justify-center gap-2 py-6 w-full text-[#f9fafb]`}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          damping: 10,
        }}
        className="flex w-[90%] sm:w-[70%] justify-between backdrop-blur-lg border-[1.2px] dark:border-gray-600 p-6 rounded-2xl"
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
          {/* <Link
            href={"/pricing"}
            className="md:flex align-middle hidden md:visible"
          >
            <span className="text-base sm:text-xl font-medium sm:font-bold text-foreground">
              Pricing
            </span>
          </Link> */}
          {status !== "loading" && (
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
                    src={user.image || defaultImage}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                    loading="lazy"
                    decoding="async"
                  />
                  <button
                    onClick={() => signOut()}
                    className="text-foreground p-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
      {/* <ForceLogout /> */}
    </nav>
  );
};

export default NavBar;
