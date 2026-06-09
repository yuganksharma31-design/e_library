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
         
<header className="sticky top-0 z-50 bg-[#F7F5F2]">

  {/* TOP STRIP */}
  <div className="bg-[#1C1C1C] py-2 text-center text-xs text-white">

    Seth Shree Surajmal Tapariya E-Granthalay

  </div>

  {/* MAIN NAVBAR */}
  <div className="border-b border-stone-200 bg-white">

    <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

      {/* LOGO */}
      <Link href="/">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-[#98003A]
              text-lg
              font-bold
              text-white
            "
          >
            ॐ
          </div>

          <div>

            <h1 className="text-[15px] font-bold leading-tight text-[#98003A]">

              Seth Shree Surajmal Tapariya

            </h1>

            <p className="text-xs tracking-widest text-stone-500">

              E-GRANTHALAY

            </p>

          </div>

        </div>

      </Link>

      {/* MENU */}
      <nav className="hidden items-center gap-10 text-sm font-medium md:flex">

        <Link
          href="/"
          className="border-b-2 border-[#98003A] pb-1 text-[#98003A]"
        >
          Home
        </Link>

        <Link
          href="/manuscripts"
          className="transition hover:text-[#98003A]"
        >
          Manuscripts
        </Link>

        <Link
          href="/books"
          className="transition hover:text-[#98003A]"
        >
          Books
        </Link>

        <Link
          href="/about"
          className="transition hover:text-[#98003A]"
        >
          About Us
        </Link>

      </nav>

      {/* SEARCH */}
      <div className="hidden lg:block">

        <input
          type="text"
          placeholder="Search archive..."
          className="
            rounded-full
            border
            border-stone-200
            bg-[#F7F5F2]
            px-5
            py-2
            text-sm
            outline-none
          "
        />

      </div>

    </div>

  </div>

</header>



         
        )}

        {children}
      </body>
    </html>
  );
}