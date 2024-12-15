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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            {levelTests.map((level) => (
              <LevelComponent
                key={level}
                level={level}
                onClick={() => router.push("/c1/level/" + level)}
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
  onClick,
}: {
  level: number;
  onClick: () => void;
}) {
  return (
    <div
      className="cursor-pointer border rounded-lg transition-colors duration-200 hover:border-purple-500"
      onClick={onClick}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base md:text-xl font-bold mb-1">
              Level {level}
            </h3>
            <p className="text-xs md:text-sm text-gray-500">
              Aptitude & Programming
            </p>
          </div>
          <ChevronRight className="text-gray-400 w-5 h-5" />
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {["A", "B", "C", "D", "E"].map((set) => (
            <span
              key={set}
              className="px-2 py-1 text-xs font-semibold rounded-full border"
            >
              {set}
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
      className="cursor-pointer border rounded-lg transition-colors duration-200 hover:border-purple-500"
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
