"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, Loader2, BellRing } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import defaultImage from "@/assets/default-avatar.png";
import myAvatar from "@/assets/my-avatar.jpg";
import Announcement, {
  announcementsArray,
} from "@/components/Notifications/Anouncement";

const ANNOUNCEMENT_LAST_SHOWN_KEY = "announcement_last_shown_time";
const SHOW_INTERVAL = 4 * 60 * 60 * 1000; // 2 hours

const NavBar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [hasNewAnnouncements, setHasNewAnnouncements] = useState(false);
  const announcementsLength = announcementsArray?.length;

  useEffect(() => {
    if (status === "loading") return;
    if (pathname.includes("/pricing")) return;
    if (!user) router.push("/");
  }, [user, status, router, pathname]);

  useEffect(() => {
    const lastShownTime = localStorage.getItem(ANNOUNCEMENT_LAST_SHOWN_KEY);
    const currentTime = new Date().getTime();

    if (!lastShownTime) {
      setHasNewAnnouncements(true);
    } else {
      const timeDiff = currentTime - parseInt(lastShownTime);
      if (timeDiff > SHOW_INTERVAL) {
        setHasNewAnnouncements(true);
      }
    }
  }, []);

  const handleAnnouncementClick = () => {
    setShowAnnouncements(true);
    setHasNewAnnouncements(false);
    localStorage.setItem(
      ANNOUNCEMENT_LAST_SHOWN_KEY,
      new Date().getTime().toString()
    );
  };

  const relativeRoutes = ["/c1/level/", "/c1/practice/", "/c2/"];
  const isRelativeRoute = relativeRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google");
    setLoading(false);
  };

  return (
    <nav
      className={`${
        isRelativeRoute ? "relative" : "sticky"
      } top-0 z-50 w-full px-1 py-3`}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", damping: 15 }}
        className="mx-auto max-w-6xl"
      >
        <div className="relative flex items-center justify-between px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 rounded-2xl border border-violet-500/20 bg-black/50 backdrop-blur-xl">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                whileTap={{ scale: 0.95, rotate: -3 }}
                className="relative"
              >
                <div className="absolute -inset-1.5 rounded-lg bg-gradient-to-r from-indigo-400/40 via-purple-400/40 to-pink-400/40 opacity-60 blur-sm group-hover:opacity-80 transition duration-300" />
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-indigo-300/30 to-pink-300/30 p-0.5 transition duration-300 group-hover:from-indigo-400/40 group-hover:to-pink-400/40">
                  <div className="absolute inset-0 bg-black/90 rounded-lg backdrop-blur-xl" />
                </div>
                <Image
                  src={myAvatar}
                  alt="Logo"
                  width={300}
                  height={200}
                  className="relative size-10 sm:size-12 rounded-lg border-2 border-indigo-300/30 transform transition-all duration-300 group-hover:border-pink-300/40 shadow-lg shadow-indigo-500/10"
                />
                {/* <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.1, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <div className="relative">
                    <div className="absolute inset-0 blur-sm bg-yellow-400/50 rounded-full" />
                    <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 filter drop-shadow-lg" />
                  </div>
                </motion.div> */}
              </motion.div>
            </div>
            <div className="flex flex-col">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-200 bg-clip-text text-sm sm:text-lg md:text-xl font-bold tracking-tight text-transparent"
              >
                Finish66
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="hidden md:block text-xs bg-gradient-to-r from-indigo-200/70 via-purple-200/70 to-pink-200/70 bg-clip-text text-transparent font-medium tracking-wider"
              >
                ✨ Learn • Create • Innovate ✨
              </motion.span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {/* <div className="relative group">
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 blur" />
              <ThemeSwitch />
            </div> */}

            {status !== "loading" && (
              <AnimatePresence mode="wait">
                {!user ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSignIn}
                    disabled={loading}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 px-3 sm:px-4 py-2 transition-all hover:from-violet-500/30 hover:to-purple-500/30"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine" />
                    </div>
                    <div className="absolute inset-0 rounded-xl border border-violet-500/20 group-hover:border-violet-500/40 transition-colors duration-300" />

                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-violet-300" />
                    ) : (
                      <span className="relative text-xs sm:text-sm font-medium text-violet-300">
                        Login
                      </span>
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 sm:gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAnnouncementClick}
                      className="group relative rounded-full bg-violet-500/10 p-2 transition-all hover:bg-violet-500/20"
                    >
                      {hasNewAnnouncements && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute -top-1.5 -right-1.5 flex items-center justify-center"
                        >
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/60 to-rose-500/60 blur-sm" />
                          <div className="relative flex h-4.5 min-w-4.5 items-center justify-center rounded-full border border-red-400/30 bg-gradient-to-r from-red-500/80 to-rose-500/80 px-1 shadow-lg shadow-red-500/20">
                            <span className="text-[10px] font-semibold text-red-50/90">
                              {announcementsLength}
                            </span>
                          </div>
                        </motion.div>
                      )}
                      <motion.div
                        animate={
                          hasNewAnnouncements
                            ? {
                                rotate: [-10, 10, -10],
                                transition: {
                                  duration: 0.5,
                                  repeat: Infinity,
                                  ease: "linear",
                                },
                              }
                            : {}
                        }
                      >
                        <BellRing className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-300" />
                      </motion.div>
                    </motion.button>

                    <div className="group relative">
                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 opacity-50 blur group-hover:opacity-75 transition duration-300" />
                      <div className="relative rounded-full">
                        <Image
                          src={user.image || defaultImage}
                          alt="Profile"
                          width={36}
                          height={36}
                          className="rounded-full border-2 border-violet-500/20 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => signOut()}
                      className="group relative rounded-full bg-violet-500/10 p-2 transition-all hover:bg-violet-500/20"
                    >
                      <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-300 transition-transform duration-300 group-hover:rotate-12" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent animate-shine" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent opacity-50" />
          </div>
        </div>
      </motion.div>

      {/* Announcements Modal */}
      {showAnnouncements && (
        <Announcement onClose={() => setShowAnnouncements(false)} />
      )}
    </nav>
  );
};

export default NavBar;
