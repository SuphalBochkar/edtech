"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SessionExpiredModal({ onClose }: SessionExpiredModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-lg border border-violet-500/20 shadow-2xl rounded-2xl max-w-md w-full mx-4"
      >
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-violet-900/20">
              <AlertTriangle className="w-8 h-8 text-violet-400" />
            </div>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent">
              Session Terminated
            </h2>
            <h3 className="text-lg font-medium text-violet-300">
              Multi-device Login Detected
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Your session has been terminated because you logged in from
              another device.
            </p>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-600 text-white px-8 py-2.5 rounded-xl font-medium shadow-lg transition-all duration-200 w-full sm:w-auto text-sm sm:text-base"
            >
              Login Again
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
