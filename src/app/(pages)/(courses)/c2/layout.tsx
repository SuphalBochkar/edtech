"use client";

import CustomBreadcrumb from "@/components/Courses/CustomBreadcrumb";
import NavBar from "@/components/Navbar/NavBar";
import { NotistackProvider } from "@/components/Notifications/NotifyClientProvider";
import { StyledMaterialDesignContent } from "@/components/Notifications/Notistack";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotistackProvider
      maxSnack={3}
      preventDuplicate
      Components={{ default: StyledMaterialDesignContent }}
    >
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="wrapper top-0 z-50 flex items-center justify-center gap-2 py-6 w-full">
          <CustomBreadcrumb size="lg" />
        </div>
        {children}
      </div>
    </NotistackProvider>
  );
}
