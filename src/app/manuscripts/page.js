"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ManuscriptsPage() {

  const [manuscripts, setManuscripts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 50;

  useEffect(() => {

    const fetchManuscripts = async () => {

      try {

        const res = await fetch("/api/manuscripts");

        const data = await res.json();

const manuscriptsArray =
  Array.isArray(data)
    ? data
    : data.data || [];

setManuscripts(manuscriptsArray);

setFiltered(manuscriptsArray);

        setLoading(false);

      } catch (error) {

        console.error(error);
      }
    };

    fetchManuscripts();

  }, []);

  // SEARCH
  // SEARCH
useEffect(() => {

  const timeout = setTimeout(() => {

    const filteredData = manuscripts.filter((item) =>
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFiltered(filteredData);

    setPage(1);

  }, 300);

  return () => clearTimeout(timeout);

}, [search, manuscripts]);

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
  {/* HERO */}
<section className="bg-[#F7F5F2]">

  <div className="mx-auto grid max-w-7xl gap-16 px-8 py-24 lg:grid-cols-2 lg:items-center">

    {/* LEFT */}
    <div>

      <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">

        Historical Archives

      </div>

      <h1 className="mt-6 text-6xl font-bold leading-tight text-[#1C1C1C]">

        Sanskrit
        <br />
        Manuscripts

      </h1>

      <p className="mt-8 max-w-xl text-lg leading-9 text-stone-600">

        Explore ancient manuscripts, preserved texts,
        commentaries and rare collections digitized
        for future generations.

      </p>

    </div>

    {/* IMAGE */}
    <div>

     <img
  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200"
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
      placeholder="Search manuscripts and archives..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
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

    <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div>

        <h2 className="text-4xl font-bold">
          All Manuscripts
        </h2>

        <p className="mt-3 text-stone-500">
          {filtered.length} manuscripts available
        </p>

      </div>

      <div className="rounded-full bg-white px-6 py-4 shadow-md text-stone-500">

        Showing 50 manuscripts per page

      </div>

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
  key={item._id}
  href={`/reader/${item._id}`}
>

  <div className="
group
overflow-hidden
rounded-[24px]
bg-white
shadow-lg
transition
duration-300
hover:-translate-y-1
hover:shadow-2xl
">

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

        Historical Archives

      </div>

      <h2 className="line-clamp-2 text-lg font-bold text-stone-900">

        {item.title}

      </h2>

      <div className="mt-3 text-sm text-stone-500">

  {item.language || "Sanskrit"} • {item.year || "Archive"}

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

  Open Manuscript →

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
