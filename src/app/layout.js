'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Toaster />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
