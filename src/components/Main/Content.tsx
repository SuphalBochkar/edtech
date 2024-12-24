"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import google from "@/assets/google.svg";
import MainLoading from "./MainLoading";
import { ArrowRight, Crown, Star } from "lucide-react";

const Content = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { status } = useSession();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  if (initialLoading || status === "loading") return <MainLoading />;

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl: "/home" });
    } catch (error) {
      console.error("Sign in error:", error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      //   className="max-w-8xl px-4 pt-20 md:pt-40 sm:pt-52 flex flex-col gap-5 items-center justify-center"
      className="max-w-8xl flex flex-col gap-5"
    >
      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md mx-auto pt-12 pb-6 px-6 backdrop-blur-xl"
      >
        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative w-full flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 backdrop-blur-sm shadow-lg">
            <Crown className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-medium text-violet-300 whitespace-nowrap">
              Premium Learning Platform
            </span>
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
        </motion.div>

        <div className="text-center space-y-8">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2 flex flex-col items-center justify-center"
          >
            <span className="tracking-tighter text-2xl md:text-3xl text-center font-medium text-foreground">
              Welcome to
            </span>
            <h1 className="tracking-tighter text-5xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold flex items-center justify-center">
              <span className="font-bold bg-gradient-to-b from-violet-300 to-violet-800 bg-clip-text text-transparent">
                Finish66
              </span>
              <span className="pl-2 text-foreground">EdTech</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-foreground max-w-lg text-sm mx-auto text-center tracking-tight md:text-lg font-light"
          >
            A platform where you{"'"}ll find the right content to help you
            improve your skills and grow your knowledge.
          </motion.p>

          {/* Auth Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignIn}
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white text-gray-900 font-medium transition-all duration-300 shadow-lg"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
              ) : (
                <>
                  <Image
                    src={google}
                    alt="Google logo"
                    width={20}
                    height={20}
                    priority
                  />
                  <span>Continue with Google</span>
                </>
              )}
            </motion.button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-violet-500/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-violet-400/60 backdrop-blur-sm">
                  or
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/auth/login")}
              className="group relative w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 font-medium transition-all duration-300 shadow-lg"
            >
              <span>Sign in with credentials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { icon: "🚀", text: "Quick Access" },
              { icon: "✨", text: "Premium Content" },
              { icon: "🎯", text: "Targeted Learning" },
              { icon: "🌟", text: "Full Support" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-violet-500/10 backdrop-blur-sm text-violet-300"
              >
                <span className="text-lg">{feature.icon}</span>
                <span className="text-xs font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Content;
