"use client";

import CustomBreadcrumb from "@/components/Main/CustomBreadcrumb";
import NavBar from "@/components/Navbar/NavBar";
// import Blobs from "@/components/Main/Blobs";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Blobs /> */}
      <NavBar />
      <div className="flex items-center justify-center gap-2 py-3 w-full">
        <CustomBreadcrumb />
      </div>
      {children}
    </div>
  );
}
