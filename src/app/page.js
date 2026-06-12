"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
export default function HomePage() { 
const [recentBooks, setRecentBooks] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
useEffect(() => {

  async function fetchBooks() {

    try {

      const response = await fetch("/api/library");

      const data = await response.json();

      const books =
        Array.isArray(data)
          ? data
          : data.data || [];

      setRecentBooks(
        books.slice(0, 8)
      );

    } catch (error) {

      console.log(error);

    }

  }

  fetchBooks();

}, []);
  return (
<main className="min-h-screen bg-[#98003A] text-white">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-8 pt-24 pb-24">

        <div className="max-w-5xl">

          <div className="inline-flex rounded-full bg-white/10 border border-white/20 px-5 py-3 text-sm font-medium text-yellow-300">
            Digital Sanskrit Heritage Collection
          </div>

          <h1 className="mt-8 text-6xl font-bold leading-tight lg:text-8xl">
            Seth Shree Surajmal
            <br />
            Tapariya E-Granthalay
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-stone-200">
            Preserving Sanskrit heritage through rare manuscripts,
            historical books, digitized archives and timeless knowledge
            for future generations.
          </p>

          {/* SEARCH */}
          <div className="mt-14 max-w-3xl">

            <div className="rounded-full bg-white px-8 py-6 shadow-xl">

              <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  }}
  placeholder="Search manuscripts, books and collections..."
  className="
    w-full
    bg-transparent
    text-lg
    outline-none
    placeholder:text-stone-400
  "
/>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-wrap gap-5">

            <Link href="/manuscript">
              <button
                className="
                  rounded-full
                  bg-yellow-400 text-black
                  px-8
                  py-5
                  text-white
                  shadow-lg
                  transition
                  hover:-translate-y-1
                "
              >
                Explore Manuscript
              </button>
            </Link>

            <Link href="/book">
              <button
                className="
                  rounded-full
                  bg-white/10
border border-white/20
px-8
py-5
text-white
shadow-lg
                  transition
                  hover:-translate-y-1
                "
              >
                Browse Books
              </button>
            </Link>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-8 pb-28">

        <div className="grid gap-8 md:grid-cols-4">

          <div className="rounded-[32px]
bg-white/10
border border-white/10
backdrop-blur-xl
p-10">

            <h2 className="text-5xl font-bold text-yellow-300">
              13K+
            </h2>

            <p className="mt-4 text-stone-200">
              Manuscripts
            </p>

          </div>

          <div className="rounded-[32px]
bg-white/10
border border-white/10
backdrop-blur-xl
p-10">

            <h2 className="text-5xl font-bold text-yellow-300">
              15K+
            </h2>

            <p className="mt-4 text-stone-200">
              Books
            </p>

          </div>

         
          <div className="rounded-[32px]
bg-white/10
border border-white/10
backdrop-blur-xl
p-10">

            <h2 className="text-5xl font-bold text-yellow-300">
              25+
            </h2>

            <p className="mt-4 text-stone-200">
              Collections
            </p>

          </div>

        </div>

      </section>
         
{/* COLLECTIONS */}
<section className="mx-auto max-w-7xl px-8 py-32">

  <div className="mb-20">

    <div className="text-sm font-semibold uppercase tracking-[4px] text-yellow-300">
      Collections
    </div>

    <h2 className="mt-5 text-6xl font-bold text-white">

      Explore Our Archives

    </h2>

  </div>

  <div className="grid gap-10 lg:grid-cols-2">

    {/* MANUSCRIPTS */}
    <Link href="/manuscript">

      <div className="group relative overflow-hidden rounded-[40px]">

        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200"
          className="
            h-[500px]
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute bottom-10 left-10 right-10 text-white">

          <div className="text-sm uppercase tracking-[4px] text-yellow-300">

            Historical Archives

          </div>

          <h3 className="mt-5 text-5xl font-bold">

            Sanskrit
            <br />
            Manuscripts

          </h3>

          <p className="mt-6 max-w-md text-lg leading-8 text-stone-200">

            Explore thousands of digitized manuscripts
            and ancient Sanskrit collections.

          </p>

          <div className="mt-8 font-semibold text-yellow-300">

            Explore →

          </div>

        </div>

      </div>

    </Link>

    {/* BOOKS */}
    <Link href="/book">

      <div className="group relative overflow-hidden rounded-[40px]">

        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200"
          className="
            h-[500px]
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute bottom-10 left-10 right-10 text-white">

          <div className="text-sm uppercase tracking-[4px] text-yellow-300">

            Literary Heritage

          </div>

          <h3 className="mt-5 text-5xl font-bold">

            Rare Books
            <br />
            Collection

          </h3>

          <p className="mt-6 max-w-md text-lg leading-8 text-stone-200">

            Browse philosophy, literature and
            historical archives preserved digitally.

          </p>

          <div className="mt-8 font-semibold text-yellow-300">

            Browse →

          </div>

        </div>

      </div>

    </Link>

  </div>

</section>
<section className="mx-auto max-w-7xl px-8 py-24">

  <div className="mb-16">

    <div className="text-sm uppercase tracking-[4px] text-yellow-300">
      Discover
    </div>

    <h2 className="mt-4 text-6xl font-bold text-white">
      Recently Added
    </h2>

  </div>

  <div className="grid gap-8 md:grid-cols-4">

    {/* cards later */}
<div className="grid gap-8 md:grid-cols-4">

  {recentBooks.map((item) => (

<Link
  key={item.identifier}
  href={`/book/${item.identifier}`}
>

<div
className="
overflow-hidden
rounded-[30px]
bg-white/10
border border-white/10
backdrop-blur-xl
shadow-xl
transition
duration-300
hover:-translate-y-1
"
>

<img
src={
item.cover ||
`https://archive.org/services/img/${item.identifier}`
}
className="h-[260px] w-full object-cover"
/>

<div className="p-6">

<div className="text-sm uppercase tracking-[3px] text-yellow-300">
New Arrival
</div>

<h3 className="mt-4 line-clamp-2 text-xl font-bold">
{item.title}
</h3>

<div
className="
mt-6
rounded-full
bg-yellow-400
px-6
py-3
text-center
text-black
font-semibold
"
>
Read →
</div>

</div>

</div>

</Link>

))}

</div>
  </div>

</section>
           {/* ABOUT */}
<section
  className="
    relative
    overflow-hidden
    bg-[#98003A]
    py-28
    text-center
    text-white
  "
>

  <div className="mx-auto max-w-5xl px-8">

    <div className="text-sm font-semibold uppercase tracking-[4px] text-yellow-300">
      About Us
    </div>

    <h2 className="mt-8 text-6xl font-bold">
      Preserving Wisdom
      <br />
      Across Generations
    </h2>

    <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-stone-200">

      Seth Shree Surajmal Tapariya E-Granthalay is committed to
      preserving rare manuscripts, historical books and invaluable
      Sanskrit heritage. Through digitization and global accessibility,
      we ensure timeless knowledge remains available for future scholars.

    </p>

    <button
      className="
        mt-14
        rounded-full
        bg-yellow-400
        px-8
        py-4
        font-semibold
        text-black
        transition
        hover:scale-105
      "
    >
      Read More
    </button>

  </div>

</section>
   
{/* MISSION */}
<section
  className="
    relative
    overflow-hidden
    bg-[#98003A]
    py-32
    text-white
  "
>

  {/* Pattern */}
  <div
    className="
      absolute
      inset-0
      opacity-10
    "
    style={{
      backgroundImage:
        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
      backgroundSize: "30px 30px"
    }}
  />

  
       


</section>


     
{/* FOOTER */}
<footer className="border-t border-white/10 bg-[#7F0030]">

  <div className="mx-auto grid max-w-7xl gap-16 px-8 py-20 md:grid-cols-4">

    {/* BRAND */}
    <div>

      <h3 className="text-3xl font-bold text-yellow-300">

        Seth Shree Surajmal
        <br />
        Tapariya
        <br />
        E-Granthalay

      </h3>

      <p className="mt-6 leading-8 text-stone-200">

        Preserving Sanskrit manuscripts, rare books and
        historical collections for future generations.

      </p>

    </div>

    {/* COLLECTIONS */}
    <div>

      <h4 className="text-lg font-bold text-yellow-300">
        Collections
      </h4>

      <div className="mt-6 space-y-4 text-stone-200">

        <Link href="/manuscript">
          <div className="hover:text-yellow-300">
            Manuscript

          </div>
        </Link>

        <Link href="/book">
          <div className="hover:text-yellow-300">
            Books
          </div>
        </Link>

      </div>

    </div>

   {/* QUICK LINKS */}
   
<div>

  <h4 className="text-lg font-bold text-yellow-300">
    Quick Links
  </h4>

  <div className="mt-6 space-y-4 text-stone-200">

    <Link href="/">
      <div className="hover:text-yellow-300">
        Home
      </div>
    </Link>

    <Link href="/book">
      <div className="hover:text-yellow-300">
        Books
      </div>
    </Link>

    <Link href="/manuscript">
      <div className="hover:text-yellow-300">
        Manuscripts
      </div>
    </Link>

    <Link href="/bookmarks">
      <div className="hover:text-yellow-300">
        Bookmarks
      </div>
    </Link>
  </div>
</div>
  </div>




  

</footer>

</main>

);
}
