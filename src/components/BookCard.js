"use client";

import Link from "next/link";

export default function BookCard({

  id,
  title,
  creator,
  identifier,
  coverImage,
  source,

}) {

  // ARCHIVE IMAGE

  const archiveImage =
    identifier
      ? `https://archive.org/services/img/${identifier}`
      : null;

  // READER URL

  const readerUrl =

    source === "mongo"

      ? `/reader?file=/api/pdf/${id}`

      : `/book/${identifier}`;

  return (

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* IMAGE */}

      <img
        src={
          coverImage ||
          archiveImage ||
          "/placeholder.jpg"
        }
        alt={title}
        className="w-full h-[420px] object-cover"
      />

      {/* CONTENT */}

      <div className="p-4">

        <h2 className="text-2xl font-bold line-clamp-2">

          {title}

        </h2>

        <p className="text-gray-600 mt-2">

          {creator}

        </p>

        {/* BUTTON */}

        <Link href={readerUrl}>

          <button className="mt-5 w-full bg-black text-white py-3 rounded-xl font-semibold">

            Read Book

          </button>

        </Link>

      </div>

    </div>
  );
}