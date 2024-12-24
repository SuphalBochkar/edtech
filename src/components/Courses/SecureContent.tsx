import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SecuredContent = ({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showWarning, setShowWarning] = useState(false);

  const generateWatermarkPattern = (email: string) => {
    const timestamp = new Date().toISOString();
    const watermarkText = `${email} • ${timestamp}`;
    return Array(3).fill(watermarkText).join(" • ");
  };

  useEffect(() => {
    let warningTimeout: NodeJS.Timeout;

    // Prevent right-click context menu
    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      showSecurityWarning();
    };

    // Prevent keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Print Screen
      if (e.key === "PrintScreen") {
        e.preventDefault();
        showSecurityWarning();
      }

      // Prevent Ctrl/Cmd + S, P, C, K, U
      if (
        (e.ctrlKey || e.metaKey) &&
        ["s", "p", "c", "k", "u"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        showSecurityWarning();
      }

      // Prevent F12 key
      if (e.key === "F12") {
        e.preventDefault();
        showSecurityWarning();
      }
    };

    // Handle copy attempts
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      showSecurityWarning();
    };

    // Handle selection attempts
    const handleSelect = (e: Event) => {
      e.preventDefault();
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }
    };

    // Show warning message
    const showSecurityWarning = () => {
      setShowWarning(true);
      clearTimeout(warningTimeout);
      warningTimeout = setTimeout(() => setShowWarning(false), 3000);
    };

    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("select", handleSelect);
    document.addEventListener("selectstart", handleSelect);

    const element = containerRef.current;
    if (element) {
      element.addEventListener("contextmenu", (e: MouseEvent) => {
        e.preventDefault();
        handleContextMenu(e as unknown as React.MouseEvent);
      });
    }

    // Disable right click
    document.addEventListener("contextmenu", (e: Event) => {
      e.preventDefault();
      showSecurityWarning();
    });

    // Additional security measures
    // Disable browser's native image drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      showSecurityWarning();
    };

    document.addEventListener("dragstart", handleDragStart);

    // Clean up event listeners
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("select", handleSelect);
      document.removeEventListener("selectstart", handleSelect);
      document.removeEventListener("dragstart", handleDragStart);
      if (element) {
        element.removeEventListener("contextmenu", (e: MouseEvent) => {
          e.preventDefault();
          handleContextMenu(e as unknown as React.MouseEvent);
        });
      }
      clearTimeout(warningTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      {/* Dynamic Watermark Layer */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] select-none flex items-center justify-center"
        style={{
          zIndex: 1000,
        }}
      >
        <div
          className="whitespace-nowrap text-violet-400 text-sm absolute"
          style={{
            transform: "rotate(-45deg)",
            width: "200%",
            left: "-50%",
            textAlign: "center"
          }}
        >
          {Array(20)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="my-8">
                {generateWatermarkPattern(email)}
              </div>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">{children}</div>

      {/* Warning Message */}
      {showWarning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-4 right-4 bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg z-[1001] flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Not Allowed
        </motion.div>
      )}
    </div>
  );
};

export default SecuredContent;
