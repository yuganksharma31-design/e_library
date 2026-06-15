"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}`
        );

        const data = await res.json();

        setResults(data.data || []);
      } catch (error) {
        console.error(error);
        setResults([]);
      }

      setLoading(false);
    }

    if (q.trim()) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [q]);

  return (
    <main className="min-h-screen bg-[#F8F5EF] p-10">
      <h1 className="mb-3 text-5xl font-bold">
        Search Results
      </h1>

      <p className="mb-10 text-stone-500">
        {results.length} results found for "{q}"
      </p>

      {loading ? (
        <div className="flex h-[300px] items-center justify-center text-2xl text-stone-500">
          Searching...
        </div>
      ) : results.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center text-2xl text-stone-500">
          No results found for "{q}"
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {results.map((item, index) => (
            <Link
              key={index}
              href={`/reader/${encodeURIComponent(
                item.identifier
              )}`}
            >
              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  bg-white
                  shadow-xl
                  transition
                  duration-300
                  hover:-translate-y-1
                "
              >
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title || "Untitled"}
                  className="h-[300px] w-full object-cover"
                />

                <div className="p-6">
                  <div className="text-sm font-semibold text-[#98003A] uppercase">
                    {item.type}
                  </div>

                  <h2 className="mt-3 line-clamp-3 text-xl font-bold">
                    {item.title || "Untitled"}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}