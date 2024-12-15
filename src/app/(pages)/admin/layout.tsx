"use client";

import CustomBreadcrumb from "@/components/Courses/CustomBreadcrumb";
import NavBar from "@/components/Navbar/NavBar";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex items-center justify-center gap-2 py-3 w-full">
        <CustomBreadcrumb />
      </div>
      {children}
    </div>
  );
}
