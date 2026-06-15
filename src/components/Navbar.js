
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  useEffect(() => {
  async function fetchSuggestions() {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(search)}`
      );

      const data = await res.json();

      setSuggestions(data.data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  }

  const timer = setTimeout(fetchSuggestions, 300);

  return () => clearTimeout(timer);
}, [search]);

  const handleSearch = () => {
  if (!search.trim()) return;

  setSuggestions([]);

  router.push(
    `/search?q=${encodeURIComponent(search)}`
  );

  setMenuOpen(false);
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
flex-wrap
items-center
justify-between
gap-6
px-4
md:px-8
py-4
">

          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <div className="flex cursor-pointer items-center gap-4">

           <div
  className="
    h-12
    w-12
    md:h-14
    md:w-14
    overflow-hidden
    rounded-full
    bg-white
    shadow-md
    flex
    items-center
    justify-center
  "
>
  <img
    src="/logo.jpg"
    alt="Logo"
    className="h-full w-full object-cover"
  />
</div>

              <div>
                <h1 className="text-sm md:text-[15px] font-bold text-white">
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
gap-6
text-sm
xl:gap-10
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
          <div className="hidden lg:flex shrink-0 relative">
            

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
{suggestions.length > 0 && (
  <div
    className="
    absolute
    top-full
    mt-3
    w-[350px]
    rounded-3xl
    bg-white
    shadow-2xl
    overflow-hidden
    z-50
    "
  >
    {suggestions.map((item, index) => {
      const id = item.identifier || item._id;

      if (!id) return null;

      return (
        <Link
  key={`${item.identifier}-${index}`}
  href={item.url}
  className="
    flex
    gap-4
    p-4
    hover:bg-stone-100
    transition
  "
  onClick={() => setSuggestions([])}
>
  <img
    src={
      item.image ||
      item.cover ||
      item.thumbnail ||
      "/placeholder.jpg"
    }
    alt={item.title || "Book"}
    className="h-16 w-16 rounded-xl object-cover"
  />

  <div>
    <div className="text-xs text-[#98003A] font-semibold">
      {item.type}
    </div>

    <div className="text-black font-medium line-clamp-2">
      {item.title || "Untitled"}
    </div>
  </div>
</Link>
      );
    })}
  </div>
)}
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
          lg:hidden
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

