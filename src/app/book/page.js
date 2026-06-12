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

  {/* SEARCH */}
  <section className="mx-auto max-w-7xl px-8 pb-16">

    <div className="rounded-full bg-white px-8 py-6 shadow-xl">

      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          bg-transparent
          text-lg
          outline-none
          placeholder:text-stone-400
        "
      />

    </div>

  </section>

  {/* CONTENT */}
  <section className="mx-auto max-w-7xl px-8 pb-20">



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
      {" "}15,489+{" "}
    </span>
    books preserved for future generations.
  </p>

</div>
    
    

    {loading ? (

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

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
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

       {paginatedData.map((item) => (

  <Link
  key={item._id || item.identifier}
  href={`/reader/${encodeURIComponent(item.identifier || item._id)}`}
  scroll={true}
>

    <div
  className="
    group
    overflow-hidden
    rounded-[24px]
    bg-white
    shadow-lg
    transition
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
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
  h-[180px]
  w-full
  object-cover
"
      />

      {/* OVERLAY */}
      

      {/* CONTENT */}
      <div className="p-5">

        <div className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black">
          Literary Heritage
        </div>

        <h2 className="mt-4 line-clamp-2 text-lg font-bold text-stone-900">
          {item.title}
        </h2>

       <div className="mt-3 text-sm text-stone-500">

  {item.language || "Unknown"} • {item.year || "Archive"}

</div>

       <div
  className="
    mt-5
    rounded-xl
    border
    border-[#98003A]
    py-3
    text-center
    font-semibold
    text-[#98003A]
    transition
    group-hover:bg-[#98003A]
    group-hover:text-white
  "
>

  Read Book →

</div>

      </div>

    </div>

  </Link>

))}

          

        </div>
        {/* PAGINATION */}
        <div className="mt-20 flex items-center justify-center gap-5">

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="
              rounded-full
              bg-white
              px-8
              py-4
              shadow-lg
              transition
              hover:-translate-y-1
              disabled:opacity-40
            "
          >

            ← Previous
          </button>

          <div
            className="
              rounded-full
              bg-white
              px-8
              py-4
              shadow-lg
              text-stone-500
            "
          >
            {page} / {totalPages}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="
              rounded-full
              bg-white
              px-8
              py-4
              shadow-lg
              transition
              hover:-translate-y-1
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
  <footer className="mt-32 border-t border-stone-200">

    <div className="mx-auto max-w-7xl px-8 py-20">

      <h3 className="text-3xl font-bold">

        Seth Shree Surajmal Tapariya
        E-Granthalay

      </h3>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-500">

        A Digital Repository of Sanskrit Manuscripts,
        Rare Books and Historical Collections.

      </p>

      <div className="mt-12 text-sm text-stone-400">

        © 2026 SMTASM • Preserving Knowledge For Future Generations

      </div>

    </div>

  </footer>

</main>

);
}


