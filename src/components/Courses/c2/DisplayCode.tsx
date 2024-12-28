"use client";

import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const DisplayCode = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Enhanced syntax highlighting theme
  const customStyle = {
    ...atomOneDark,
    hljs: {
      ...atomOneDark.hljs,
      background: "transparent",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group rounded-xl overflow-hidden border border-violet-500/20 bg-violet-950/20 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-violet-500/20 bg-violet-500/5">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium text-violet-300">
            Solution Code
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg
            bg-violet-500/10 hover:bg-violet-500/20
            border border-violet-500/20 hover:border-violet-500/30
            text-violet-300 transition-all duration-200"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isCopied ? "check" : "copy"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Code Content */}
      <div className="relative group">
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language="cpp"
            style={customStyle}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "0.875rem",
              fontFamily: "JetBrains Mono, monospace",
            }}
            showLineNumbers
            lineNumberStyle={{
              minWidth: "2.5em",
              paddingRight: "1em",
              color: "rgb(139, 92, 246, 0.3)",
              textAlign: "right",
              userSelect: "none",
            }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      </div>
    </motion.div>
  );
};
