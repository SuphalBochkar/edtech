"use client";

import AllTests from "@/components/Tests/AllTests";
import Blobs from "@/components/Blobs";

const Page = () => {
  return (
    <div className="flex flex-col relative overflow-hidden">
      <Blobs />
      <div className="flex flex-col align-middle justify-center items-center content-center">
        <AllTests />
      </div>
    </div>
  );
};

export default Page;
