"use client";

import Image from "next/image";
import { RefreshCw } from "lucide-react";
import { Status } from "@/lib/types";
import updating from "@/assets/updating.gif";
import errorImage from "@/assets/404-error.gif";

export default function ErrorPage({
  status = null,
  text,
}: {
  status?: Status | null;
  text: string;
}) {
  const image = status === null ? errorImage : updating;
  return (
    <div className="flex flex-col items-center justify-center p-4 text-foreground">
      <div className="flex flex-col items-center w-full max-w-lg text-center">
        <Image
          src={image}
          alt={text}
          width={100}
          height={100}
          className={`${
            status === null
              ? "w-[300px] h-[350px] md:w-[400px] md:h-[450px]"
              : "w-[200px] h-[300px] md:w-[300px] md:h-[400px]"
          } rounded-lg shadow-lg mb-8`}
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
