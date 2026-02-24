import {TanstackQueryProvider} from "@/shared/providers";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import {Toaster} from "sonner";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Authentication System",
  description: "Authentication system application"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
    <body className={`${spaceMono.variable} antialiased`}>
    <TanstackQueryProvider>
      <Toaster position='bottom-right' />
        {children}
    </TanstackQueryProvider>
    </body>
    </html>
  );
}
