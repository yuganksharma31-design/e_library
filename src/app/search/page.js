"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [booksRes, manuscriptsRes] = await Promise.all([
          fetch("/api/library"),
          fetch("/api/manuscripts"),
        ]);

        const booksData = await booksRes.json();
        const manuscriptsData = await manuscriptsRes.json();

        const books = Array.isArray(booksData)
          ? booksData
          : booksData.data || [];

        const manuscripts = Array.isArray(manuscriptsData)
          ? manuscriptsData
          : manuscriptsData.data || [];

        const combined = [
          ...books.map((item) => ({
            ...item,
            type: "Book",
            url: `/reader/${item.identifier || item._id}`,
          })),
          ...manuscripts.map((item) => ({
            ...item,
            type: "Manuscript",
            url: `/reader/${item.identifier || item._id}`,
          })),
        ];

        const filtered = combined.filter((item) =>
          item.title?.toLowerCase().includes(q.toLowerCase())
        );

        setResults(filtered);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    fetchData();
  }, [q]);

  return (
    <main className="min-h-screen bg-[#F8F5EF] px-8 py-16">
      <h1 className="text-5xl font-bold mb-4">
        Search Results
      </h1>

      <p className="text-stone-500 mb-10">
        {results.length} results found for "{q}"
      </p>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {results.map((item, index) => (
            <Link key={index} href={item.url}>
              <div className="rounded-3xl bg-white shadow-xl overflow-hidden hover:-translate-y-1 transition">
                <img
                  src={
                    item.thumbnail ||
                    item.cover ||
                    item.image ||
                    "/placeholder.jpg"
                  }
                  alt={item.title}
                  className="h-[300px] w-full object-cover"
                />

                <div className="p-5">
                  <div className="text-sm text-[#98003A] font-semibold uppercase">
                    {item.type}
                  </div>

                  <h2 className="mt-3 text-xl font-bold line-clamp-3">
                    {item.title}
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
        <div className="min-h-screen flex items-center justify-center bg-[#F8F5EF]">
          Loading...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}