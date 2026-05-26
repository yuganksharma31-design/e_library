"use client";

import Link from "next/link";

export default function BookCard({
  title,
  creator,
  identifier,
  coverImage,
  pdfUrl,
  source,
}) {

  // ARCHIVE IMAGE

  const archiveImage =
    identifier
      ? `https://archive.org/services/img/${identifier}`
      : null;

  // IMPORTANT:
  // uploaded PDFs open manuscript-style reader

  const readerUrl =
    source === "mongo"
      ? `/reader?file=${encodeURIComponent(pdfUrl)}`
      : `/book/${identifier}`;

  return (

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* COVER */}

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