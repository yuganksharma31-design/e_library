"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BookPage() {
  const { id } = useParams();
  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}, []);
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch(
          `https://archive.org/metadata/${encodeURIComponent(id)}`
        );

        const data = await response.json();

        setBook(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      fetchMetadata();
    }
  }, [id]);

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5EF] text-stone-900">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] text-stone-900">

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-8 py-20">

        <div className="grid gap-16 lg:grid-cols-2">

          {/* COVER */}
          <div>
            <img
              src={`https://archive.org/services/img/${encodeURIComponent(id)}`}
              alt={book.metadata?.title}
              className="
                mx-auto
                max-h-[700px]
                rounded-[40px]
                shadow-2xl
              "
            />
          </div>

          {/* DETAILS */}
          <div>

            <div className="inline-flex rounded-full bg-[#98003A] px-5 py-2 text-sm font-semibold text-white">
              Rare Book
            </div>

            <h1 className="mt-8 text-5xl font-bold leading-tight">
              {book.metadata?.title}
            </h1>

            <div className="mt-10 space-y-5 text-lg text-stone-600">

              <div>
                <span className="font-bold">Author:</span>{" "}
                {book.metadata?.creator || "Unknown"}
              </div>

              <div>
                <span className="font-bold">Language:</span>{" "}
                {book.metadata?.language || "Unknown"}
              </div>

              <div>
                <span className="font-bold">Year:</span>{" "}
                {book.metadata?.year || "Unknown"}
              </div>

              <div>
                <span className="font-bold">Collection:</span>{" "}
                {Array.isArray(book.metadata?.collection)
                  ? book.metadata.collection.join(", ")
                  : book.metadata?.collection || "Archive"}
              </div>

            </div>

            <div className="mt-14 flex flex-wrap gap-5">

              <Link
                href={`/reader/${encodeURIComponent(id)}`}
                className="
                  rounded-full
                  bg-[#98003A]
                  px-8
                  py-4
                  font-semibold
                  text-white
                  shadow-xl
                  transition
                  hover:scale-105
                "
              >
                📖 Open Book
              </Link>
              <button
onClick={() => {

navigator.clipboard.writeText(
window.location.href
);

alert("Link copied");

}}
className="
rounded-full
bg-white
px-8
py-4
shadow-lg
"
>

🔗 Share

</button>

              <a
                href={`https://archive.org/details/${encodeURIComponent(id)}`}
                target="_blank"
                className="
                  rounded-full
                  bg-white
                  px-8
                  py-4
                  font-semibold
                  shadow-lg
                  transition
                  hover:-translate-y-1
                "
              >
                🌐 Original Archive
              </a>

              <button
                className="
                  rounded-full
                  bg-white
                  px-8
                  py-4
                  font-semibold
                  shadow-lg
                  transition
                  hover:-translate-y-1
                "
              >
                ❤️ Add to Favorites
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* DESCRIPTION */}
      <section className="mx-auto max-w-7xl px-8 pb-24">

        <div className="rounded-[40px] bg-white p-12 shadow-xl">

          <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
            Description
          </div>

          <p className="mt-8 text-lg leading-9 text-stone-600">

            {book.metadata?.description ||
              "No description available for this book."}

          </p>

        </div>

      </section>

    </main>
  );
}