"use client";

import ContactUsButton from "@/components/Contact/ContactUsButton";
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
        <div className="flex items-center justify-center gap-2 py-3 w-full">
          <CustomBreadcrumb />
        </div>
        {children}
      </div>
      <ContactUsButton />
    </NotistackProvider>
  );
}
