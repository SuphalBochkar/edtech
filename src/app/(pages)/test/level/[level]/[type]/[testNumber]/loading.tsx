import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center md:p-4 min-h-screen overflow-clip">
      <div className="w-full md:max-w-4xl p-2 md:p-4 md:rounded-lg bg-purple-800/5 space-y-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-purple-900/10 p-4 rounded-md animate-pulse"
            >
              <div className="bg-purple-800/10 h-6 mb-4 rounded-md"></div>
              <div className="bg-purple-700/10 h-4 mb-4 rounded-md"></div>
              <div className="bg-purple-700/10 h-4 mb-4 rounded-md"></div>
              <div className="bg-purple-800/10 h-4 mb-4 rounded-md"></div>
              <ul className="bg-purple-700/10 rounded-md p-3">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <li
                      key={i}
                      className="bg-purple-600/10 h-4 mb-2 rounded-md"
                    ></li>
                  ))}
              </ul>
              <div className="bg-purple-800/10 h-4 rounded-md mt-4"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Loading;
