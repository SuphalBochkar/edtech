import React from "react";
import { Sparkles, Star } from "lucide-react";

const WelcomeMsg = ({ name = "", isPaid = false }) => {
  const firstName = (name: string) => {
    return name.split(" ")[0];
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl" /> */}
      <div className="relative flex flex-col items-center justify-center space-y-2 p-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight">
            <span className="text-white/90">Welcome back,</span>{" "}
            <span className="inline-block bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              {firstName(name)}
            </span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            We{"'"}re excited to see you again
          </p>
        </div>
        <div className="transform hover:scale-105 transition-all duration-300">
          {isPaid ? (
            <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium shadow-lg shadow-blue-500/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Premium Member</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium shadow-lg shadow-gray-900/20">
              <Star className="w-4 h-4" />
              <span className="text-sm">Free Plan</span>
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default WelcomeMsg;
