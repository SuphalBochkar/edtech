"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useSession } from "next-auth/react";

const ContactUsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showText, setShowText] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const { data: session } = useSession();

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(false);
    }, 5000);

    return () => {
      clearTimeout(textTimer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id,
          message,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit query");
      }
      setSubmitStatus("success");
      setMessage("");
    } catch (error) {
      console.error("Error submitting message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Contact Button - Enhanced styling */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 hover:border-violet-500/50 backdrop-blur-sm transition-all duration-300"
      >
        {/* Button content remains exactly the same */}
        <AnimatePresence mode="wait">
          {showText ? (
            <motion.div
              key="text"
              initial={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-violet-300" />
              <span className="text-sm font-medium text-violet-300 whitespace-nowrap">
                Contact Us
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <MessageCircle className="w-5 h-5 text-violet-300" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shine rounded-xl" />
        </div>
      </motion.button>

      {/* Popup Modal - Enhanced styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-2 w-80 rounded-2xl border border-violet-500/20 bg-black/90 backdrop-blur-xl p-4"
          >
            {/* Close button - Enhanced */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-violet-500/10 text-violet-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
                Contact Support
              </h2>
            </div>

            {/* Modal Content - Enhanced typography and spacing */}
            <div className="mb-3">
              <p className="text-sm text-violet-300/70">
                <span className="font-medium">You can also reach us on </span>
                <a
                  href="https://t.me/+sYgr_ndeZQIzZTll"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 transition-colors duration-200 inline-flex items-center group"
                >
                  Telegram
                  <ExternalLink className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
              </p>
            </div>

            {!session ? (
              <div className="text-center p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm">
                <p className="text-sm text-violet-200">
                  Please sign in to contact our support team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full h-24 px-3 py-2 text-sm rounded-xl bg-violet-500/10 border border-violet-500/20 focus:border-violet-500/40 text-violet-100 placeholder-violet-400/50 outline-none transition-colors resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 disabled:opacity-50 disabled:hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 font-medium transition-all duration-300"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span className="text-sm">Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Status Messages - Enhanced styling */}
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm"
                    >
                      <p className="text-sm text-emerald-300 text-center">
                        Message sent successfully! We{"'"}ll resolve your issue
                        soon.
                      </p>
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm"
                    >
                      <p className="text-sm text-red-300 text-center">
                        Failed to send message. Please try again.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactUsButton;
