"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ManuscriptPage() {

  const { id } = useParams();

  const [manuscript, setManuscript] = useState(null);

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

  }, []);

  useEffect(() => {

    async function fetchMetadata() {

      try {

        const response = await fetch(
          `https://archive.org/metadata/${encodeURIComponent(id)}`
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
              src={`https://archive.org/services/img/${encodeURIComponent(id)}`}
              alt={manuscript.metadata?.title}
              className="
mx-auto
w-full
max-w-[500px]
rounded-[40px]
shadow-2xl
transition
duration-500
hover:scale-[1.02]
"
            />

          </div>

          {/* DETAILS */}
          <div>

            <div className="inline-flex rounded-full bg-gradient-to-r from-[#98003A] to-[#B31255] px-5 py-2 text-sm font-semibold text-white">

              Ancient Manuscript

            </div>

            <h1 className="mt-8 text-4xl lg:text-5xl font-bold leading-tight">

              {manuscript.metadata?.title}

            </h1>

            {/* BUTTONS */}
            <div
              className="
              mt-8
              grid
              gap-5
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              "
            >

              <Link
                href={`/reader/${encodeURIComponent(id)}`}
                className="
                  rounded-full
                  bg-[#98003A]
                  px-8
                  py-5
                  text-center
                  font-semibold
                  text-white
                  shadow-xl
                  transition
                  hover:scale-105
                "
              >
                📜 Open Manuscript
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
                  bg-white border border-stone-200
                  px-8
                  py-5
                  shadow-xl
                  transition
                  hover:-translate-y-1
                "
              >
                🔗 Share
              </button>

              <button
                className="
                  rounded-full
                  bg-white border border-stone-200
                  px-8
                  py-5
                  font-semibold
                  shadow-xl
                  transition
                  hover:-translate-y-1
                "
              >
                ❤️ Add to Favorites
              </button>

            </div>

            {/* METADATA */}
           <div className="mt-12 grid gap-5 sm:grid-cols-2">

  <div className="rounded-[30px] bg-white p-6 shadow-xl">
    <div className="text-sm uppercase tracking-[4px] text-[#D6A700]">
      Author
    </div>

    <div className="mt-3 text-lg font-semibold">
      {manuscript.metadata?.creator || "Unknown"}
    </div>
  </div>

  <div className="rounded-[30px] bg-white p-6 shadow-xl">
    <div className="text-sm uppercase tracking-[4px] text-[#D6A700]">
      Language
    </div>

    <div className="mt-3 text-lg font-semibold">
      {manuscript.metadata?.language || "Unknown"}
    </div>
  </div>

  <div className="rounded-[30px] bg-white p-6 shadow-xl">
    <div className="text-sm uppercase tracking-[4px] text-[#D6A700]">
      Year
    </div>

    <div className="mt-3 text-lg font-semibold">
      {manuscript.metadata?.year || "Unknown"}
    </div>
  </div>

  <div className="rounded-[30px] bg-white p-6 shadow-xl">
    <div className="text-sm uppercase tracking-[4px] text-[#D6A700]">
      Collection
    </div>

    <div className="mt-3 text-lg font-semibold">
      {
        Array.isArray(manuscript.metadata?.collection)
          ? manuscript.metadata.collection.join(", ")
          : manuscript.metadata?.collection || "Archive"
      }
    </div>
  </div>

</div>
            </div>

          </div>

       

      </section>

      {/* DESCRIPTION */}
      <section className="mx-auto max-w-7xl px-8 pb-24">

        <div className="
rounded-[40px]
bg-white
border
border-stone-200
p-12
shadow-2xl
">

          <div className="text-sm font-semibold uppercase tracking-[4px] text-[#">

            Description

          </div>

          <p className="mt-8 text-lg leading-9 text-stone-600">

            {
              manuscript.metadata?.description ||
              "No description available for this manuscript."
            }

          </p>

        </div>

      </section>

    </main>

  );

}