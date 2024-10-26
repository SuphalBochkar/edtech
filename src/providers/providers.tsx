// /src/providers/providers.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
