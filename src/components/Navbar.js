
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#98003A]/90 backdrop-blur-xl border-b border-white/10">

      {/* TOP STRIP */}
      <div className="bg-[#7A002F] py-2 text-center text-xs tracking-wider text-yellow-300">
Seth Shri Surajmal Taparia E-Granthalay      </div>

      {/* NAVBAR */}
      <div className="border-b border-white/10 bg-[#98003A]/90">

        <div className="
mx-auto
max-w-7xl
flex
items-center
justify-between
gap-10
px-8
py-5
">

          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <div className="flex cursor-pointer items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-[#98003A] shadow-lg">
                ॐ
              </div>

              <div>
                <h1 className="text-[15px] font-bold text-white">
                  Seth Shri Surajmal Taparia 
                </h1>

                <p className="text-xs tracking-widest text-yellow-300">
                  E-Granthalay
                </p>
              </div>

            </div>
          </Link>
{/* MENU DESKTOP */}
          <nav className="
hidden
lg:flex
flex-1
justify-center
items-center
gap-10
text-[15px]
font-semibold
text-white
">

            <Link
              href="/"
              className="
transition-all
duration-300
hover:text-yellow-300
hover:-translate-y-1
"
            >
              Home
            </Link>

            <Link
              href="/book"
              className="
transition-all
duration-300
hover:text-yellow-300
hover:-translate-y-1
"
            >
              Books
            </Link>

            <Link
              href="/manuscript"
              className="
transition-all
duration-300
hover:text-yellow-300
hover:-translate-y-1
"
            >
              Manuscripts
            </Link>

            <Link
              href="/bookmarks"
              className="
transition-all
duration-300
hover:text-yellow-300
hover:-translate-y-1
"
            >
              Bookmarks
            </Link>

            <Link
              href="/about"
              className="
transition-all
duration-300
hover:text-yellow-300
hover:-translate-y-1
"
            >
              About
            </Link>

          </nav>

          {/* SEARCH BAR DESKTOP */}
          <div className="hidden lg:flex shrink-0">

            <div
className="
flex
w-[280px]
items-center
rounded-full
border
border-white/20
bg-white/10
px-5
py-3
backdrop-blur-xl
"
>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
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
                onClick={handleSearch}
                className="ml-3 text-yellow-300"
              >
                🔍
              </button>

            </div>

          </div>

          
          {/* HAMBURGER */}
          <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="
lg:hidden
ml-auto
text-3xl
text-yellow-300
"
>
            ☰
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div
          className="
          space-y-6
          border-t
          border-white/10
          bg-[#98003A]
          px-8
          py-8
          text-lg
          font-medium
          md:hidden
        "
        >

          {/* SEARCH BAR MOBILE */}
          <div
            className="
            flex
            items-center
            rounded-full
            border
            border-white/20
            bg-white/10
            px-5
            py-3
          "
          >

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
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
              onClick={handleSearch}
              className="ml-3 text-yellow-300"
            >
              🔍
            </button>

          </div>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block text-white transition hover:text-yellow-300"
          >
            Home
          </Link>

          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="block text-white transition hover:text-yellow-300"
          >
            Books
          </Link>

          <Link
            href="/manuscript"
            onClick={() => setMenuOpen(false)}
            className="block text-white transition hover:text-yellow-300"
          >
            Manuscripts
          </Link>

          <Link
            href="/bookmarks"
            onClick={() => setMenuOpen(false)}
            className="block text-white transition hover:text-yellow-300"
          >
            Bookmarks
          </Link>

          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block text-white transition hover:text-yellow-300"
          >
            About
          </Link>

        </div>

      )}

    </header>
  );
}

