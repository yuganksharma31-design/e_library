"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BooksPage() {

  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
const [sort, setSort] = useState("A-Z");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 50;
  function formatCount(num) {

  if (num >= 1000) {

    return `${(num / 1000).toFixed(1)}K+`;

  }

  return num.toString();

}

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const res = await fetch("/api/library");

        const data = await res.json();

const booksArray =
  Array.isArray(data)
    ? data
    : data.data || [];

setBooks(booksArray);

setFiltered(booksArray);

        setLoading(false);

      } catch (error) {

        console.error(error);
      }
    };

    fetchBooks();

  }, []);

  // SEARCH
 // SEARCH
useEffect(() => {

  const timeout = setTimeout(() => {

  const filteredData = books.filter((item) => {

  const matchesSearch =
    item.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesLanguage =
    language === "All" ||
    item.language === language;

  return matchesSearch && matchesLanguage;

});
    let sorted = [...filteredData];

if (sort === "A-Z") {

  sorted.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

}

if (sort === "Z-A") {

  sorted.sort((a, b) =>
    b.title.localeCompare(a.title)
  );

}

setFiltered(sorted);

    setPage(1);

  }, 300);

  return () => clearTimeout(timeout);

}, [search, books]);
  // PAGINATION
  const totalPages = Math.ceil(
    filtered.length / ITEMS_PER_PAGE
  );

  const paginatedData = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (




<main className="min-h-screen bg-[#F8F5EF] text-stone-900">


{/* HERO */}
<section className="bg-[#F7F5F2]">

  <div className="mx-auto grid max-w-7xl gap-16 px-8 py-24 lg:grid-cols-2 lg:items-center">

    {/* LEFT */}
    <div>

      <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">

        Literary Heritage

      </div>

      <h1 className="mt-6 text-6xl font-bold leading-tight text-[#1C1C1C]">

        Rare Books
        <br />

        Collection

      </h1>

      <p className="mt-8 max-w-xl text-lg leading-9 text-stone-600">

        Explore philosophy, literature, commentaries and
        preserved historical books from our digital archive.

      </p>

    </div>

    {/* IMAGE */}
    <div>

  <img
    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200"
    className="
      h-[450px]
      w-full
      rounded-[40px]
      object-cover
      shadow-2xl
    "
  />

</div>
</div>
</section>

 
  {/* CONTENT */}
  <section className="mx-auto max-w-7xl px-8 py-20">



       <div className="mb-16">

  <div className="text-sm font-semibold uppercase tracking-[4px] text-[#D6A700]">
    Digital Collection
  </div>

  <h1 className="mt-5 text-7xl font-bold text-[#1C1C1C]">
    All Books
  </h1>

  <p className="mt-6 text-xl text-stone-500">
  Explore
  <span className="font-bold text-[#D6A700]">
    {" "}{formatCount(books.length)}{" "}
  </span>
  books preserved for future generations.
</p>

</div>
    
    

    {loading ? (

      <div
className="
grid
gap-10
md:grid-cols-2
xl:grid-cols-3
"
>

        {Array.from({ length: 8 }).map((_, index) => (

          <div
            key={index}
            className="
              h-[540px]
              animate-pulse
              rounded-[32px]
              bg-white
              shadow-xl
            "
          />

        ))}

      </div>

    ) : (

      <>

        {/* GRID */}
        <div
className="
grid
gap-10
md:grid-cols-2
xl:grid-cols-3
"
>

       {paginatedData.map((item) => (

  <Link
  key={item._id || item.identifier}
  href={`/reader/${encodeURIComponent(item.identifier || item._id)}`}
  scroll={true}
>

<div
 className="
group
flex
flex-col
overflow-hidden
rounded-[36px]
bg-white
shadow-xl
transition-all
duration-300
hover:-translate-y-2
hover:shadow-2xl
min-h-[600px]
"
>

  {/* IMAGE */}
  <img
    src={
      item.thumbnail ||
      item.cover ||
      item.image ||
      item.cover_i ||
      "/placeholder.jpg"
    }
    alt={item.title}
    className="
      h-[360px]
      w-full
      object-cover
      transition
      duration-500
      group-hover:scale-105
    "
  />

  {/* CONTENT */}
  <div className="p-8">

    {/* TITLE */}
    <h2
      className="
      text-[22px]
      font-bold
      leading-9
      text-[#111]
      line-clamp-3
      min-h-[80px]
      "
    >
      {item.title}
    </h2>

    {/* AUTHOR */}
    <div className="mt-4 text-stone-500 line-clamp-1">

      {item.creator ||
       item.author ||
       "Digital Collection"}

    </div>

    {/* BUTTON */}
    <div
      className="
      mt-8
      rounded-full
      bg-[#F5C400]
      py-4
      text-center
      font-semibold
      text-black
      transition
      group-hover:bg-[#98003A]
      group-hover:text-white
      "
    >

      Read →

    </div>

  </div>

</div>

      



  </Link>

))}

          

        </div>
        {/* PAGINATION */}
<div
className="
mt-16
flex
flex-col
sm:flex-row
items-center
justify-center
gap-4
"
>

  {/* Previous */}
  <button
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
   className="
w-[150px]
rounded-full
bg-[#98003A]
text-white
py-4
font-semibold
shadow-lg
transition
hover:bg-[#7F0030]
disabled:opacity-40
"
  >
    ← Previous
  </button>

  {/* Page Number */}
  <div
   className="
w-[130px]
rounded-full
bg-[#FFF8E6]
border
border-[#E8D9B5]
py-4
font-semibold
text-[#98003A]
shadow-lg
text-center
"
  >
    {page} / {totalPages}
  </div>

  {/* Next */}
  <button
    disabled={page === totalPages}
    onClick={() => setPage((prev) => prev + 1)}
    className="
w-[150px]
rounded-full
bg-[#98003A]
text-white
py-4
font-semibold
shadow-lg
transition
hover:bg-[#7F0030]
disabled:opacity-40
"
  >
    Next →
  </button>

</div>
      </>

    )}
     
  </section>

  {/* FOOTER */}
  <footer className="mt-0 bg-[#98003A] text-white">

  <div className="mx-auto max-w-7xl px-8 py-20">

    <h3 className="text-4xl font-bold text-white">
      Seth Shri Surajmal Taparia E-Granthalay
    </h3>

    <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-200">
      A Digital Repository of Sanskrit Manuscripts,
      Rare Books and Historical Collections.
    </p>

    <div className="mt-12 text-sm text-stone-300">
      © 2026 SMTASM • Preserving Knowledge For Future Generations
    </div>

  </div>

</footer>
</main>

);
}


