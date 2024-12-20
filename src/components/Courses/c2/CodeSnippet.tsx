"use client";

import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shad/card";
import { Switch } from "@/ui/shad/switch";
import { Button } from "@/ui/shad/button";
import { motion, AnimatePresence } from "framer-motion";

interface CodeSnippetProps {
  title: string;
  code: string;
  index: number;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  title,
  code,
  index,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="w-full bg-background border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Snippet {index + 1}: {title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            className="data-[state=checked]:bg-primary"
          />
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isDarkTheme ? "moon" : "sun"}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDarkTheme ? (
                <Moon className="h-4 w-4 text-primary" />
              ) : (
                <Sun className="h-4 w-4 text-primary" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <SyntaxHighlighter
            language="cpp"
            style={isDarkTheme ? atomOneDark : atomOneLight}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              backgroundColor: isDarkTheme ? "black" : "white",
              fontFamily: "JetBrains Mono, monospace",
              color: isDarkTheme ? "white" : "black",
            }}
          >
            {code}
          </SyntaxHighlighter>
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-2 right-2 bg-primary/10 hover:bg-primary/20 text-primary"
            onClick={copyToClipboard}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isCopied ? "check" : "copy"}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
