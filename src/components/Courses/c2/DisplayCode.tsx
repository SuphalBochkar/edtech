"use client";

import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react";
import { Button } from "@/ui/shad/button";
import { motion, AnimatePresence } from "framer-motion";

export const DisplayCode = ({ code }: { code: string }) => {
  //   const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isDarkTheme = true;

  return (
    <div className="w-full border-t-2">
      <div className="relative">
        <SyntaxHighlighter
          language="cpp"
          style={isDarkTheme ? atomOneDark : atomOneLight}
          //   showLineNumbers
          customStyle={{
            margin: 0,
            borderRadius: "0.2rem",
            fontSize: "0.875rem",
            backgroundColor: isDarkTheme ? "black" : "white",
            fontFamily: "JetBrains Mono, monospace",
            color: isDarkTheme ? "white" : "black",
          }}
        >
          {"\n" + code}
        </SyntaxHighlighter>
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-0 right-0 bg-primary/10 hover:bg-primary/20 text-primary"
          onClick={copyToClipboard}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isCopied ? "check" : "copy"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-foreground flex items-center !text-sm"
            >
              {isCopied ? (
                <>
                  Copied &nbsp; <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Copy Code &nbsp;
                  <Copy className="h-4 w-4" />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
};
