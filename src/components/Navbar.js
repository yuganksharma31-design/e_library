"use client";

import Link from "next/link";
import { useState } from "react";
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#F7F5F2]">

      {/* Top strip */}
      <div className="bg-[#1C1C1C] py-2 text-center text-xs text-white">
        Seth Shree Surajmal Tapariya E-Granthalay
      </div>
      
      {/* Main navbar */}
      <div className="border-b border-stone-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-4 cursor-pointer">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#98003A] text-lg font-bold text-white">
                ॐ
              </div>

              <div>

                <h1 className="text-[15px] font-bold text-[#98003A]">
                  Seth Shree Surajmal Tapariya
                </h1>

                <p className="text-xs tracking-widest text-stone-500">
                  E-GRANTHALAY
                </p>

              </div>

            </div>
          </Link>

         {/* Hamburger */}
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="
  md:hidden
  text-3xl
  text-[#98003A]
  "
>
  ☰
</button>

{/* Navigation */}
<nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link href="/">
              Home
            </Link>

            <Link href="/book">
              Books
            </Link>

            <Link href="/manuscript">
              Manuscripts
            </Link>

           <Link href="/favorites">
❤️ Favorites
</Link>

            <Link href="/about">
              About
            </Link>

          </nav>

        </div>

      </div>

  {
    menuOpen && (

      <div
        className="
        md:hidden
        border-t
        bg-white
        px-8
        py-8
        space-y-6
        text-lg
        font-medium
        shadow-lg
        "
      >

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="block"
        >
          Home
        </Link>

        <Link
          href="/book"
          onClick={() => setMenuOpen(false)}
          className="block"
        >
          Books
        </Link>

        <Link
          href="/manuscript"
          onClick={() => setMenuOpen(false)}
          className="block"
        >
          Manuscripts
        </Link>

        <Link
          href="/favorites"
          onClick={() => setMenuOpen(false)}
          className="block"
        >
          ❤️ Favorites
        </Link>

        <Link
          href="/about"
          onClick={() => setMenuOpen(false)}
          className="block"
        >
          About
        </Link>

      </div>

    )
  }
    </header>
  );
}