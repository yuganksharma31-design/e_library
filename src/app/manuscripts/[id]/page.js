"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ManuscriptPage() {
  const { id } = useParams();

  const [manuscript, setManuscript] = useState(null);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch(
          `https://archive.org/metadata/${id}`
        );

        const data = await response.json();

        setManuscript(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      fetchMetadata();
    }
  }, [id]);

  if (!manuscript) {
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
              src={`https://archive.org/services/img/${id}`}
              alt={manuscript.metadata?.title}
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
              Ancient Manuscript
            </div>

            <h1 className="mt-8 text-5xl font-bold leading-tight">

              {manuscript.metadata?.title}

            </h1>

            <div className="mt-10 space-y-5 text-lg text-stone-600">

              <div>
                <span className="font-bold">
                  Author:
                </span>{" "}
                {manuscript.metadata?.creator || "Unknown"}
              </div>

              <div>
                <span className="font-bold">
                  Language:
                </span>{" "}
                {manuscript.metadata?.language || "Unknown"}
              </div>

              <div>
                <span className="font-bold">
                  Year:
                </span>{" "}
                {manuscript.metadata?.year || "Unknown"}
              </div>

              <div>
                <span className="font-bold">
                  Collection:
                </span>{" "}
                {Array.isArray(manuscript.metadata?.collection)
                  ? manuscript.metadata.collection.join(", ")
                  : manuscript.metadata?.collection || "Archive"}
              </div>

            </div>

            <div className="mt-14 flex flex-wrap gap-5">

              <Link
                href={`/reader/${id}`}
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
                📜 Open Manuscript
              </Link>

              <a
                href={`https://archive.org/details/${id}`}
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

            {manuscript.metadata?.description ||
              "No description available for this manuscript."}

          </p>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-200">

        <div className="mx-auto max-w-7xl px-8 py-16">

          <h3 className="text-3xl font-bold text-[#98003A]">
            Seth Shree Surajmal Tapariya E-Granthalay
          </h3>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-500">
            Preserving Sanskrit Manuscripts and Rare Books
            for Future Generations.
          </p>

          <div className="mt-10 text-sm text-stone-400">
            © 2026 SMTASM • All Rights Reserved
          </div>

        </div>

      </footer>

    </main>
  );
}