"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader, Mail, MessageCircle } from "lucide-react";

export default function ContactUsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showText, setShowText] = useState(true);
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
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-xl shadow-lg hover:from-violet-500 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 flex items-center justify-center overflow-hidden backdrop-blur-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="flex items-center justify-center"
          layout
          initial={false}
          animate={{
            width: showText ? "auto" : "3.5rem",
            height: showText ? "auto" : "3.5rem",
            padding: showText ? "0.75rem 1.25rem" : "0",
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <AnimatePresence mode="popLayout">
            {showText && (
              <motion.span
                className="mr-2 text-sm font-medium whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Need Help?
              </motion.span>
            )}
          </AnimatePresence>
          <MessageCircle size={20} className="flex-shrink-0" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 rounded-2xl shadow-2xl p-4 sm:p-6 w-[85vw] sm:w-96 bg-gradient-to-b from-gray-900 to-black border border-violet-500/20 backdrop-blur-lg text-white"
          >
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1 hover:text-violet-100 transition-colors duration-200 rounded-full hover:bg-violet-500/10 text-red-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Close
            </motion.button>

            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
                Contact Support
              </h2>
            </div>

            {!session ? (
              <div className="text-center p-4 sm:p-6 bg-violet-900/20 rounded-xl">
                <p className="text-sm sm:text-base text-violet-200">
                  Please sign in to contact our support team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question..."
                  className="w-full h-28 sm:h-32 p-3 sm:p-4 bg-violet-900/20 border border-violet-500/30 rounded-xl resize-none focus:ring-violet-500 focus:border-transparent text-foreground placeholder-violet-400 text-xs sm:text-sm"
                  required
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold shadow-lg disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin" size={16} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-2.5 sm:p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-xs sm:text-sm text-center"
                    >
                      Message sent successfully! We{"'"}ll resolve your issue
                      soon.
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-2.5 sm:p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-xs sm:text-sm text-center"
                    >
                      Failed to send message. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
