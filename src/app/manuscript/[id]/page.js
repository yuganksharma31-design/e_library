"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

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
                  bg-white
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
                  bg-white
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
            <div className="mt-12 space-y-5 text-lg text-stone-600">

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

                {
                  Array.isArray(manuscript.metadata?.collection)
                    ? manuscript.metadata.collection.join(", ")
                    : manuscript.metadata?.collection || "Archive"
                }

              </div>

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