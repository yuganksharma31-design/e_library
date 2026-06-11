"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BookPage() {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      const response = await fetch(
        `https://archive.org/metadata/${id}`
      );

      const data = await response.json();

      setBook(data);
    }

    if (id) fetchBook();
  }, [id]);

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5EF]">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] py-20">

      <div className="mx-auto grid max-w-7xl gap-16 px-8 lg:grid-cols-2">

        {/* Cover */}
        <div>
          <img
            src={`https://archive.org/services/img/${id}`}
            className="
            mx-auto
            rounded-[40px]
            shadow-2xl
            max-h-[700px]
            "
          />
        </div>

        {/* Details */}
        <div>

          <div className="text-sm uppercase tracking-[4px] text-[#98003A] font-semibold">
            Digital Heritage Collection
          </div>

          <h1 className="mt-6 text-5xl font-bold">
            {book.metadata?.title}
          </h1>

          <div className="mt-10 space-y-5 text-lg text-stone-600">

            <div>
              <b>Author:</b>{" "}
              {book.metadata?.creator || "Unknown"}
            </div>

            <div>
              <b>Language:</b>{" "}
              {book.metadata?.language || "Unknown"}
            </div>

            <div>
              <b>Year:</b>{" "}
              {book.metadata?.year || "Unknown"}
            </div>

            <div>
              <b>Collection:</b>{" "}
              {book.metadata?.collection || "Archive"}
            </div>

          </div>

          <div className="mt-12 flex flex-wrap gap-5">

            <Link
              href={`/reader/${id}`}
              className="
              rounded-full
              bg-[#98003A]
              px-8
              py-4
              text-white
              font-semibold
              shadow-xl
              "
            >
              📖 Read Online
            </Link>

            <button
  onClick={() => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.find((x) => x.id === id)) {
      favorites.push({
        id,
        title:
          book?.metadata?.title ||
          manuscript?.metadata?.title,
        cover: `https://archive.org/services/img/${id}`
      });

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      alert("Added to favorites ❤️");
    }
  }}
  className="
  rounded-full
  bg-white
  px-8
  py-4
  font-semibold
  shadow-lg
  "
>
  ❤️ Add to Favorites
</button>

            <a
              href={`https://archive.org/details/${id}`}
              target="_blank"
              className="
              rounded-full
              bg-white
              px-8
              py-4
              shadow-lg
              "
            >
              🌐 Original Archive
            </a>

          </div>

        </div>

      </div>

    </main>
  );
}