"use client";

import ContactUsButton from "@/components/Contact/ContactUsButton";
import NavBar from "@/components/Navbar/NavBar";

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen">
      <NavBar />
      {children}
      <ContactUsButton />
    </div>
  );
};

export default TestLayout;
