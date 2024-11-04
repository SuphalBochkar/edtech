// /src/app/(pages)/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/providers";
import { Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
// import Script from "next/script";

export const metadata: Metadata = {
  title: "Finish66 EdTech",
  description:
    "Finish66 EdTech is a user-friendly platform designed for students seeking accessible education courses and resources. Our comprehensive content library offers a variety of educational materials tailored to enhance learning and drive success.",
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="./icon.svg" type="image/svg+xml" />
      <body className={`${lato.className} bg-background text-foreground`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
      {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" /> */}
    </html>
  );
}
