import React from "react";
import LevelComponent from "@/ui/Aceternity/LevelComponent";

export default function AllTests() {
  return (
    <div className="min-h-screen py-12">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 border-b pb-4">
          AE Tests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((level) => (
            <div
              key={level}
              className="rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
            >
              <LevelComponent level={level} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-8 border-b pb-4">
          Level Tests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((level) => (
            <div
              key={level}
              className="rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
            >
              <LevelComponent level={level} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* {/* <Link
    key={level}
    href={`/level/${level}`}
    className="bg-blue-500 text-white p-4 rounded text-center hover:bg-blue-600 transition"
  >
    Level {level}
  </Link> }
</>
 */
