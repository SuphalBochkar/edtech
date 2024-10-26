"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

const ErrorFallback = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Check network status
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Alert Box */}
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          {/* Alert Icon */}
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12" y2="16" />
            </svg>
            <h3 className="ml-2 text-lg font-medium text-red-800">
              Authentication Error
            </h3>
          </div>

          {/* Alert Message */}
          <p className="mt-2 text-sm text-red-700">
            {!isOnline
              ? "You appear to be offline. Please check your internet connection."
              : "There was a problem signing you in. Please try again."}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogin}
            disabled={!isOnline || isLoading}
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Sign In Icon */}
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>

        {/* Help Text */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Having trouble? Try clearing your browser cache or using a different
          browser.
        </p>
      </div>
    </div>
  );
};

export default ErrorFallback;
