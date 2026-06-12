"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Navbar() {
    
  const [menuOpen, setMenuOpen] = useState(false);
const [search, setSearch] = useState("");
const router = useRouter();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#98003A]/90 border-b border-white/10">

      {/* Top strip */}
      <div className="bg-[#7A002F] py-2 text-center text-xs text-yellow-300 tracking-wider">
        Seth Shree Surajmal Tapariya E-Granthalay
      </div>
      
      {/* Main navbar */}
      <div className="border-b border-white/10 bg-[#98003A]/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-4 cursor-pointer">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-[#98003A] shadow-lg">
                ॐ
              </div>

              <div>

                <h1 className="text-[15px] font-bold text-white">
                  Seth Shree Surajmal Tapariya
                </h1>

                <p className="text-xs tracking-widest text-yellow-300">
                  E-GRANTHALAY
                </p>

              </div>

            </div>
          </Link>
          <div className="hidden lg:flex flex-1 max-w-xl">

  <div className="flex w-full items-center rounded-full bg-white/10 border border-white/20 px-6 py-3">

    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && search.trim()) {
          router.push(`/search?q=${encodeURIComponent(search)}`);
        }
      }}
      placeholder="Search books and manuscripts..."
      className="
        w-full
        bg-transparent
        text-white
        outline-none
        placeholder:text-stone-300
      "
    />

    <button
      onClick={() => {
        if (search.trim()) {
          router.push(`/search?q=${encodeURIComponent(search)}`);
        }
      }}
      className="ml-3 text-yellow-300"
    >
      🔍
    </button>

  </div>

</div>

         {/* Hamburger */}
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="
  lg:hidden
  text-3xl
  text-yellow-300
  "
>
  ☰
</button>

{/* Navigation */}
<nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-white">
            <Link
  href="/"
  className="transition hover:text-yellow-300"
>
  Home
</Link>

            <Link href="/book"
              className="transition hover:text-yellow-300"
>

            
              Books
            </Link>

            <Link href="/manuscript"
            className="transition hover:text-yellow-300">
              Manuscripts
            </Link>

           <Link href="/bookmarks"
           className="transition hover:text-yellow-300">
Bookmarks
</Link>

            <Link href="/about"
            className="transition hover:text-yellow-300">
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
        bg-[#98003A]
        px-8
        py-8
        space-y-6
        text-lg
        font-medium
        border-t border-white/10
        "
      >

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="block text-white hover:text-yellow-300 transition"
        >
          Home
        </Link>

        <Link
          href="/book"
          onClick={() => setMenuOpen(false)}
          className="block text-white hover:text-yellow-300 transition"
        >
          Books
        </Link>

        <Link
          href="/manuscript"
          onClick={() => setMenuOpen(false)}
          className="block text-white hover:text-yellow-300 transition"
        >
          Manuscripts
        </Link>

        <Link
          href="/bookmarks"
          onClick={() => setMenuOpen(false)}
          className="block text-white hover:text-yellow-300 transition"
        >
          Bookmarks
        </Link>

        <Link
          href="/about"
          onClick={() => setMenuOpen(false)}
          className="block text-white hover:text-yellow-300 transition"
        >
          About
        </Link>

      </div>

    )
  }
    </header>
  );
}