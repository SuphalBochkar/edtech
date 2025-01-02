/*
    !!!!! ==> Unused Component <== !!!!!
*/

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useState } from "react";

export const Appbar = () => {
  const session = useSession();
  const user = session.data?.user;

  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    console.log("Signing In...");
    await signIn("google");
    console.log("Signed In!");
    setLoading(false);
  };

  return (
    <nav className="sticky wrapper top-0 z-50 flex items-center gap-2 py-6 w-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          damping: 10,
        }}
        className="flex w-[90%] sm:w-[70%] justify-between mx-auto shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border- p-6 rounded-2xl"
      >
        <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
          <Image
            src={"https://avatars.githubusercontent.com/u/114354506?v=4"}
            alt="Logo"
            width={300}
            height={200}
            className="rounded-full size-10"
          />
          <span className="text-lg md:text-2xl font-bold tracking-tight text-foreground text-[#f9fafb] md:block">
            EdTech
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            {!user ? (
              <button
                onClick={handleSignIn}
                disabled={loading}
                className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
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
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </nav>
  );
};
