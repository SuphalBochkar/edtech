"use client";

import NavBar from "@/components/NavBar";
import Pricing from "@/components/Pricing/Pricing";
import WhyPricing from "@/components/Pricing/WhyPricing";

export default function page() {
  return (
    <div>
      <div className="text-background flex flex-col w-full h-full align-middle justify-center items-center content-center">
        <NavBar />
        <div className="sm:grid sm:grid-cols-2 flex flex-col align-middle sm:pt-8">
          <div className="col-span-1">
            <Pricing />
          </div>
          <div className="col-span-1 h-full">
            <WhyPricing />
          </div>
        </div>
      </div>
    </div>
  );
}
