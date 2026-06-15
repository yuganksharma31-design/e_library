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
      }

      setLoading(false);
    }

    if (q) {
  fetchData();
} else {
  setResults([]);
}
  }, [q]);

  return (
    <main className="min-h-screen bg-[#F8F5EF] p-10">
      <h1 className="text-4xl font-bold mb-8">
        Search Results
      </h1>
      <p className="mb-8 text-stone-500">
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
    {results.map((item) => (
  <Link key={item.url} href={item.url}>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title || "Untitled"}
                  className="h-[300px] w-full object-cover"
                />

                <div className="p-6">
                  <div className="text-[#98003A] text-sm font-semibold">
                    {item.type}
                  </div>

                  <h2 className="mt-3 text-xl font-bold line-clamp-3">
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
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}