"use client";

import NavBar from "@/components/NavBar";

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen">
      <NavBar />
      {children}
    </div>
  );
};

export default TestLayout;
