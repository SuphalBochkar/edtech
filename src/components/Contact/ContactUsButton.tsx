"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Loader } from "lucide-react";

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
    const timer = setTimeout(() => {
      setShowText(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitStatus("success");
      setMessage("");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-purple-800 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{
          width: "auto",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
        }}
        animate={
          showText
            ? { width: "auto", paddingLeft: "1.25rem", paddingRight: "1.25rem" }
            : {
                width: "3.5rem",
                height: "3.5rem",
                paddingLeft: "0",
                paddingRight: "0",
              }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {showText && (
            <motion.span
              className="mr-2 text-sm font-medium whitespace-nowrap"
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              Contact Us
            </motion.span>
          )}
        </AnimatePresence>
        <MessageCircle size={20} className="flex-shrink-0" />
        <span className="sr-only">Contact Us</span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 border dark:border-white/30 rounded-lg shadow-xl p-6 w-80 backdrop-blur-lg"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
            >
              <X size={20} />
              <span className="sr-only">Close</span>
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Contact Us
            </h2>
            {!session ? (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Please sign in to contact us.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue..."
                  className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <Loader className="animate-spin mx-auto" size={20} />
                  ) : (
                    "Submit"
                  )}
                </button>
                {submitStatus === "success" && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    Message sent! We{"'"}ll be resolving your issue soon.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
