"use client";

import CustomBreadcrumb from "@/components/Courses/CustomBreadcrumb";
import NavBar from "@/components/NavBar";
import { NotistackProvider } from "@/components/Notifications/NotifyClientProvider";
import { StyledMaterialDesignContent } from "@/components/Notifications/Notistack";

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotistackProvider
      maxSnack={3}
      preventDuplicate
      Components={{ default: StyledMaterialDesignContent }}
    >
      <div className="max-h-screen">
        <NavBar />
        <CustomBreadcrumb />
        {children}
      </div>
    </NotistackProvider>
  );
};

export default TestLayout;
