"use client";

import React from "react";
import { CalendarIcon, BookOpen, ChevronRight } from "lucide-react";
import { aeTests, levelTests } from "@/lib/data-c1";
import { useRouter } from "next/navigation";

export default function AllTests() {
  const router = useRouter();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-8 md:py-10">
      <h1 className="text-lg md:text-2xl font-bold text-center">
        Available Tests
      </h1>
      <div className="space-y-8 sm:space-y-12">
        <section>
          <h2 className="text-lg md:text-2xl font-semibold mb-4">AE Tests</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {aeTests.map((test) => (
              <PracticeComponent
                key={test.id}
                {...test}
                onClick={() => router.push("/c1/practice/" + test.id)}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-lg md:text-2xl font-semibold mb-4">
            Level Tests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {levelTests.map((obj) => (
              <LevelComponent
                key={obj.level}
                level={obj.level}
                isNew={obj.isNew}
                onClick={() => router.push("/c1/level/" + obj.level)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function LevelComponent({
  level,
  isNew,
  onClick,
}: {
  level: number;
  isNew: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="relative cursor-pointer border border-gray-500 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-gray-300 group bg-gray-900/50 backdrop-blur-sm"
      onClick={onClick}
    >
      {isNew && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">
          NEW
        </div>
      )}
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
              Level {level}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-1.5 font-medium">
              Aptitude & Programming
            </p>
          </div>
          <div className="p-2 sm:p-2.5 rounded-full border border-gray-600 group-hover:border-gray-400 transition-colors bg-gray-800/50">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {["A", "B", "C", "D", "E"].map((set) => (
            <span
              key={set}
              className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs font-semibold rounded-lg border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              Set {set}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PracticeComponent({
  name,
  type,
  date,
  onClick,
}: {
  name: string;
  type: string;
  date: string;
  onClick: () => void;
}) {
  return (
    <div
      className="cursor-pointer border border-gray-500 rounded-lg transition-colors duration-200 hover:border-gray-200"
      onClick={onClick}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm md:text-lg font-semibold mb-2">{name}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
              <p className="text-xs md:text-sm text-gray-500 flex items-center">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {type}
              </p>
              <p className="text-xs md:text-sm text-gray-500 flex items-center">
                <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {date}
              </p>
            </div>
          </div>
          <ChevronRight className="text-gray-400 w-5 h-5 ml-2" />
        </div>
      </div>
    </div>
  );
}
