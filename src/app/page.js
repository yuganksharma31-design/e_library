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
<main className="min-h-screen bg-[#F8F5EF] text-stone-900">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-8 pt-24 pb-24">

        <div className="max-w-6xl">

          <div className="
inline-flex
items-center
rounded-full
bg-[#FFF8E6]
px-7
py-3
text-sm
font-semibold
tracking-[4px]
uppercase
text-[#98003A]
">
  Rare Manuscripts • Books 
</div>
<h1
className="
mt-10
max-w-5xl
text-5xl
font-bold
leading-tight
text-[#1C1C1C]
md:text-6xl
lg:text-7xl
"
>
  Seth Shri Surajmal
  <br />
  Taparia&nbsp;E-Granthalay
</h1>

          <p className="
mt-10
max-w-3xl
text-xl
leading-10
text-stone-500
">
Preserving Sanskrit manuscripts, rare books, digitized archives and timeless wisdom for scholars and future generations.
</p>
          
          {/* BUTTONS */}
          <div className="mt-12 flex flex-wrap gap-5">

            <Link href="/manuscript">
              <button
                className="
                  rounded-full
                  bg-yellow-400 text-black
                  px-8
                  py-5
                  text-[#1C1C1C]
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
text-[#1C1C1C]
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
bg-gradient-to-br from-white to-[#FFF8E8]
border border-[#E8D9B5]
border border-stone-200
shadow-xl
p-10">

            <h2 className="text-5xl font-bold text-[#98003A]">
              13K+
            </h2>

            <p className="mt-4 text-stone-500">
              Manuscripts
            </p>

          </div>

          <div className="rounded-[32px]
bg-white
border border-stone-200
shadow-xl
p-10">

            <h2 className="text-5xl font-bold text-[#98003A]">
              15K+
            </h2>

            <p className="mt-4 text-stone-500">
              Books
            </p>

          </div>

         
          <div className="rounded-[32px]
bg-white
border border-stone-200
shadow-xl
p-10">

            <h2 className="text-5xl font-bold text-[#98003A]">
              25+
            </h2>

            <p className="mt-4 text-stone-500">
              Collections
            </p>

          </div>

        </div>

      </section>
         
{/* COLLECTIONS */}
<section className="mx-auto max-w-7xl px-8 py-32">


  <div className="mb-20">

    <div className="text-sm font-semibold uppercase tracking-[6px] text-[#98003A]">
  Collections
</div>
    <h2 className="mt-5 text-6xl font-bold text-[#1C1C1C]">

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

        <div className="absolute bottom-10 left-10 right-10 text-white drop-shadow-2xl">

          <div className="text-sm uppercase tracking-[4px] text-yellow-300">

            Historical Archives

          </div>

          <h3 className="mt-5 text-5xl font-bold text-white">

            Sanskrit
            <br />
            Manuscripts

          </h3>

          <p className="mt-6 max-w-md text-lg leading-8 text-white/90">

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

        <div className="absolute bottom-10 left-10 right-10 text-white drop-shadow-2xl">

          <div className="text-sm uppercase tracking-[4px] text-yellow-300">

            Literary Heritage

          </div>

          <h3 className="mt-5 text-5xl font-bold text-white">

            Rare Books
            <br />
            Collection

          </h3>

          <p className="mt-6 max-w-md text-lg leading-8 text-white/90">

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

    <div className="text-sm uppercase tracking-[4px] text-[#98003A]">
      Discover
    </div>

    <h2 className="mt-4 text-6xl font-bold text-[#1C1C1C]">
      Recently Added
    </h2>

  </div>

<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

  {recentBooks.map((item) => (

<Link
  key={item.identifier}
  href={`/book/${item.identifier}`}
>

<div
className="
overflow-hidden
rounded-[30px]
bg-white
border border-stone-200
shadow-xl
transition
duration-300
hover:-translate-y-3
hover:shadow-2xl
h-full
"
>

<img
src={
item.cover ||
`https://archive.org/services/img/${item.identifier}`
}
className="h-[320px] w-full object-cover"
/>

<div className="p-6">

<div className="text-sm uppercase tracking-[3px] text-[#98003A]">
New Arrival
</div>

<h3 className="mt-4 line-clamp-2 text-xl font-bold text-[#1C1C1C]">
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
  

</section>
           {/* ABOUT */}
<section
  className="
    relative
    overflow-hidden
    bg-white
    py-28
    text-center
    text-[#1C1C1C]
  "
>

  <div
className="
mx-auto
max-w-5xl
rounded-[50px]
bg-white
border
border-[#E8D9B5]
shadow-2xl
px-12
py-24
"
>

    <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
      About Us
    </div>

    <h2 className="mt-8 text-6xl font-bold">
      Preserving Wisdom
      <br />
      Across Generations
    </h2>

    <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-stone-500">

      Seth Shree Surajmal Tapariya E-Granthalay is committed to
      preserving rare manuscripts, historical books and invaluable
      Sanskrit heritage. Through digitization and global accessibility,
      we ensure timeless knowledge remains available for future scholars.

    </p>

    <Link href="/about">
  <button
    className="
    rounded-full
    bg-yellow-400
    px-12
    py-6
    text-lg
    font-semibold
    shadow-lg
    transition
    duration-300
    hover:-translate-y-1
    hover:bg-[#98003A]
    hover:text-white
    "
  >
    Read More →
  </button>
</Link>

  </div>

</section>
   


     
{/* FOOTER */}
<footer className="border-t border-white/10 bg-[#7F0030]">

  <div className="mx-auto grid max-w-7xl gap-10 px-8 py-20 lg:grid-cols-3">

    {/* BRAND */}
    <div>

      <h3 className="
text-5xl
font-bold
leading-tight
text-yellow-300
">

        Seth Shree Surajmal
        <br />
        Tapariya
        <br />
        E-Granthalay

      </h3>

      <p className="mt-6 leading-8 text-white/80">

        Preserving Sanskrit manuscripts, rare books and
        historical collections for future generations.

      </p>

    </div>

    {/* COLLECTIONS */}
<div
className="
rounded-[30px]
bg-[#8C0034]
border border-white/10
p-10
"
>

  <h4 className="text-lg font-bold text-yellow-300">
    Collections
  </h4>

  <div className="mt-6 space-y-4 text-white/80">
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
   
<div
className="
rounded-[30px]
bg-[#8C0034]
border border-white/10
p-10
"
>

  <h4 className="text-lg font-bold text-yellow-300">
    Quick Links
  </h4>

  <div className="mt-6 space-y-4 text-white/80">

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
    <Link href="/about">
  <div className="hover:text-yellow-300">
    About
  </div>
</Link>
  </div>
  
</div>
  </div>




  
<div className="mt-16 border-t border-white/10 pt-8 text-center text-white/60">

  © 2026 SMTASM • Preserving Knowledge For Future Generations

</div>
</footer>

</main>

);
}
