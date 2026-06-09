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
  <section className="mx-auto max-w-7xl px-8 pt-24 pb-20">

    <div className="max-w-5xl">

      <div className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-[#8B5E34] shadow-md">

        Historical Archive Collection

      </div>

      <h1 className="mt-8 text-6xl font-bold leading-tight lg:text-8xl">

        Sanskrit
        <br />
        Manuscripts

      </h1>

      <p className="mt-8 max-w-3xl text-xl leading-9 text-stone-500">

        Explore thousands of digitized manuscripts,
        preserved texts and ancient Sanskrit collections.

      </p>

    </div>

  </section>

  {/* SEARCH */}
  <section className="mx-auto max-w-7xl px-8 pb-16">

    <div className="rounded-full bg-white px-8 py-6 shadow-xl">

      <input
        type="text"
        placeholder="Search manuscripts..."
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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {paginatedData.map((item) => (

            <Link
              key={item._id}
              href={`/reader/${item._id}`}
            >

              <div
                className="
                  group
                  overflow-hidden
                  rounded-[32px]
                  bg-white
                  shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                "
              >

                {/* IMAGE */}
                <div className="overflow-hidden">

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
                      h-[420px]
                      w-full
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-105
                    "
                  />

                </div>

                {/* CONTENT */}
                <div className="p-7">

                  <div className="inline-flex rounded-full bg-[#F8F5EF] px-4 py-2 text-xs font-medium text-[#8B5E34]">

                    Manuscript

                  </div>

                  <h2 className="mt-5 line-clamp-2 text-2xl font-bold leading-8">

                    {item.title}

                  </h2>

                  <div className="mt-5 flex items-center justify-between text-sm text-stone-500">

                    <span>

                      {item.language || "Sanskrit"}

                    </span>

                    <span>

                      {item.year || "Archive"}

                    </span>

                  </div>

                  <button
                    className="
                      mt-8
                      w-full
                      rounded-full
                      bg-[#8B5E34]
                      px-6
                      py-4
                      font-semibold
                      text-white
                      shadow-lg
                      transition
                      hover:bg-[#704823]
                    "
                  >

                    Read Manuscript

                  </button>

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
