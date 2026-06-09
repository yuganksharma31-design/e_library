"use client";

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

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isReaderPage =
    pathname?.startsWith("/reader/");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {!isReaderPage && (
         <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#F8F5EF]/90 backdrop-blur-2xl">

  <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

    <Link href="/">
      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8B5E34] text-white text-xl font-bold">
          ॐ
        </div>

        <div>

          <h1 className="text-xl font-semibold text-stone-900 leading-tight">
            Seth Shree Surajmal Tapariya
          </h1>

          <p className="text-sm text-stone-500">
            E-Granthalay
          </p>

        </div>

      </div>
    </Link>

    <nav className="hidden items-center gap-10 text-sm font-medium text-stone-700 md:flex">

      <Link
        href="/"
        className="transition hover:text-[#8B5E34]"
      >
        Home
      </Link>

      <Link
        href="/manuscripts"
        className="transition hover:text-[#8B5E34]"
      >
        Manuscripts
      </Link>

      <Link
        href="/books"
        className="transition hover:text-[#8B5E34]"
      >
        Books
      </Link>

    </nav>

  </div>

</header>

         
        )}

        {children}
      </body>
    </html>
  );
}