import { SnackbarKey, useSnackbar } from "notistack";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

export const NotifyBase = ({ CustomMessage }: { CustomMessage: React.FC }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = React.useCallback(
    (key: SnackbarKey) => (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex items-center gap-4"
        >
          <CustomMessage />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => closeSnackbar(key)}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/30 transition-all duration-200"
          >
            <X className="w-4 h-4 text-violet-400 group-hover:text-violet-300" />
          </motion.button>
        </motion.div>
      </AnimatePresence>
    ),
    [CustomMessage, closeSnackbar]
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!navigator.onLine) {
      enqueueSnackbar("No connection!", {
        variant: "error",
        persist: true,
      });
    } else {
      enqueueSnackbar({
        variant: "default",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        action: action,
      });
    }
  }, [closeSnackbar, enqueueSnackbar, action]);

  return null;
};
