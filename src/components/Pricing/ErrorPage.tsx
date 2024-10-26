"use client";

import Image from "next/image";
import { RefreshCw } from "lucide-react";
import { Status } from "@/lib/types";

export default function ErrorPage({
  status = null,
  text,
}: {
  status?: Status | null;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-foreground">
      <div className="w-full max-w-md">
        <Image
          src={"/images/error.svg"}
          alt={text}
          width={400}
          height={300}
          className="w-full h-auto rounded-lg shadow-lg mb-8"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {text}
        </h1>
        <button
          onClick={() => window.location.reload()}
          className="w-full flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          <span>{status === null ? "Try Again" : "Refresh"}</span>
        </button>
      </div>
    </div>
  );
}
