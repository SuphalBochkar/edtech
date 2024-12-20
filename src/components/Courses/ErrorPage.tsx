"use client";

import Image from "next/image";
import { RefreshCw } from "lucide-react";
import { Status } from "@/lib/types";

interface ErrorPageProps {
  status?: Status | null;
  text?: string;
  imageUrl?: string;
}

export default function ErrorPage({
  status = null,
  text,
  imageUrl = "/error-image.svg",
}: ErrorPageProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Image
            src={imageUrl}
            alt={text || "No Data"}
            width={300}
            height={300}
            className="mx-auto w-48 h-48 md:w-64 md:h-64 mb-8 rounded-lg shadow-md"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {text}
          </h1>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            aria-label={status === null ? "Try Again" : "Refresh"}
          >
            <RefreshCw className="w-5 h-5 mr-2" aria-hidden="true" />
            <span>{status === null ? "Try Again" : "Refresh"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
