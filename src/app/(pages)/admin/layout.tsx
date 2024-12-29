"use client";

import CustomBreadcrumb from "@/components/Main/CustomBreadcrumb";
import NavBar from "@/components/Navbar/NavBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-violet-950/20 to-black">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <NavBar />

      <div className="flex items-center justify-center w-full backdrop-blur-sm bg-black/20 border-b border-violet-500/5">
        <div className="container max-w-6xl mx-auto px-4 py-2">
          <CustomBreadcrumb />
        </div>
      </div>

      <main className="flex-grow relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 brightness-100 contrast-150" />
        <div className="relative">{children}</div>
      </main>
    </div>
  );
}
