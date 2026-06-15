"use client";
import Navbar from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
/>

export default function RootLayout({ children }) {
  const pathname = usePathname();

  

  return (
    <html lang="en">
      <body
  className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#98003A] text-white`}
>

  <Navbar />

  {children}

</body>
    </html>
  );
}