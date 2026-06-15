"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ManuscriptsPage() {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const ITEMS_PER_PAGE = 50;

  function formatCount(num) {
    if (num >= 1000) {
      return `${Math.round(num / 1000)}K+`;
    }
    return String(num);
  }

  function getText(value) {
    return String(
      Array.isArray(value) ? value.join(" ") : value || ""
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchManuscripts() {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(ITEMS_PER_PAGE),
        });

        if (search) params.set("search", search);
        if (language !== "All") params.set("language", language);

        const res = await fetch(`/api/manuscripts?${params.toString()}`, {
          signal: controller.signal,
        });

        const data = await res.json();

        setManuscripts(Array.isArray(data.data) ? data.data : []);
        setTotal(data.total || 0);
      } catch (error) {
        if (error?.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchManuscripts();

    return () => controller.abort();
  }, [page, search, language]);

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  return (
    <main className="min-h-screen bg-[#F8F5EF] text-stone-900">
      {/* HERO */}
      <section className="bg-[#F7F5F2]">
        <div className="mx-auto grid max-w-7xl gap-16 px-8 py-24 lg:grid-cols-2 lg:items-center">
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

          <div>
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200"
              alt="Manuscripts"
              className="h-[450px] w-full rounded-[40px] object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-8 pb-20 pt-14">
        <div className="mb-16">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[4px] text-[#D6A700]">
              Digital Collection
            </div>

            <h2 className="mt-5 text-5xl font-bold text-[#1C1C1C]">
              All Manuscripts
            </h2>

            <p className="mt-6 text-xl text-stone-500">
              Explore{" "}
              <span className="font-bold text-[#D6A700]">
                {formatCount(total)}
              </span>{" "}
              manuscripts preserved for future generations.
            </p>
          </div>

          
        </div>

        {loading ? (
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[540px] animate-pulse rounded-[32px] bg-white shadow-xl"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {manuscripts.map((item) => {
                const id = String(item.identifier || item._id || "");
                const title = getText(item.title);

                return (
                  <Link
                    key={item._id || item.identifier}
                    href={`/reader/${encodeURIComponent(id)}`}
                    scroll={true}
                  >
                    <div className="group flex min-h-[600px] flex-col overflow-hidden rounded-[36px] bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <img
                        src={
                          item.image ||
                          item.thumbnail ||
                          item.cover ||
                          `https://archive.org/services/img/${id}`
                        }
                        alt={title || "Manuscript"}
                        className="h-[320px] w-full rounded-t-[36px] object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="flex flex-1 flex-col p-8">
                        <h2 className="min-h-[90px] text-[18px] font-bold leading-8 text-[#111] line-clamp-3">
                          {title}
                        </h2>

                        <div className="mt-4 text-stone-500">
                          {item.language || "Sanskrit"} • Unknown
                        </div>

                        <div className="mt-auto pt-8">
                          <div className="rounded-full bg-[#F5C400] py-4 text-center font-semibold text-black transition group-hover:bg-[#98003A] group-hover:text-white">
                            Open Manuscript →
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="w-[150px] rounded-full bg-[#98003A] py-4 font-semibold text-white shadow-lg transition hover:bg-[#7F0030] disabled:opacity-40"
              >
                ← Previous
              </button>

              <div className="w-[130px] rounded-full border border-[#E8D9B5] bg-[#FFF8E6] py-4 text-center font-semibold text-[#98003A] shadow-lg">
                {page} / {totalPages}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="w-[150px] rounded-full bg-[#98003A] py-4 font-semibold text-white shadow-lg transition hover:bg-[#7F0030] disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </section>

      {/* FOOTER */}
      <footer className="mt-32 bg-[#98003A] text-white">
        <div className="mx-auto max-w-7xl px-8 py-20">
          <h3 className="text-3xl font-bold">
            Seth Shri Surajmal Taparia E-Granthalay
          </h3>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200">
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