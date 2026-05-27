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

    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="border-b border-zinc-800 bg-gradient-to-b from-zinc-950 to-black">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
              Historical Manuscript Archive
            </div>

            <h1 className="text-5xl font-bold md:text-7xl">
              SMT Library
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-400 md:text-xl">
              Explore ancient Sanskrit manuscripts,
              preserved archives, historical texts,
              and rare digital collections.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="border-b border-zinc-900 bg-black py-10">

        <div className="mx-auto max-w-7xl px-6">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl">

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
                px-4
                py-4
                text-lg
                outline-none
                placeholder:text-zinc-500
              "
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* TOP BAR */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-3xl font-bold">
              All Manuscripts
            </h2>

            <p className="mt-2 text-zinc-400">
              {filtered.length} manuscripts available
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm text-zinc-300">
            Showing 50 manuscripts per page
          </div>
        </div>

        {/* LOADING */}
        {loading ? (

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {Array.from({ length: 8 }).map(
              (_, index) => (

                <div
                  key={index}
                  className="
                    h-[420px]
                    animate-pulse
                    rounded-3xl
                    bg-zinc-900
                  "
                />
              )
            )}
          </div>

        ) : (

          <>
            {/* GRID */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {paginatedData.map((item) => (

                <Link
                  key={item._id}
                  href={`/reader/${item._id}`}
                >

                  <div
                    className="
                      group
                      overflow-hidden
                      rounded-3xl
                      border
                      border-zinc-800
                      bg-zinc-950
                      shadow-2xl
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-amber-500
                      hover:shadow-amber-500/20
                    "
                  >

                    {/* IMAGE */}
                    <div className="relative h-[420px] overflow-hidden">

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
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                      {/* BADGE */}
                      <div className="absolute left-4 top-4">

                        <div className="rounded-full bg-amber-500/20 px-3 py-1 text-xs text-amber-400 backdrop-blur">
                          Manuscript
                        </div>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">

                      <h2 className="line-clamp-2 text-xl font-bold text-white">
                        {item.title}
                      </h2>

                      <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">

                        <span>
                          {item.language || "Sanskrit"}
                        </span>

                        <span>
                          {item.year || "Archive"}
                        </span>
                      </div>

                      <button
                        className="
                          mt-6
                          w-full
                          rounded-2xl
                          bg-amber-500
                          px-5
                          py-4
                          font-semibold
                          text-black
                          transition
                          hover:opacity-90
                        "
                      >
                        Open Manuscript
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-16 flex items-center justify-center gap-4">

              <button
                disabled={page === 1}
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
                className="
                  rounded-2xl
                  border
                  border-zinc-700
                  px-6
                  py-3
                  transition
                  hover:bg-zinc-900
                  disabled:opacity-40
                "
              >
                Previous
              </button>

              <div className="rounded-2xl bg-zinc-900 px-6 py-3">

                Page {page} of {totalPages}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
                className="
                  rounded-2xl
                  border
                  border-zinc-700
                  px-6
                  py-3
                  transition
                  hover:bg-zinc-900
                  disabled:opacity-40
                "
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}