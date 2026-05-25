"use client";

import Link from "next/link";

export default function BookCard({
  title,
  identifier,
  creator,
}) {

  const thumbnail =
    `https://archive.org/services/img/${identifier}`;

  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">

      {/* THUMBNAIL */}

      <img
        src={thumbnail}
        alt={title}
        loading="lazy"
        className="w-full h-72 object-cover bg-gray-200"
      />

      {/* CONTENT */}

      <div className="p-4">

        <h2 className="font-bold text-2xl line-clamp-3">

          {title}

        </h2>

        <p className="text-gray-600 mt-2">

          {creator || "Unknown"}

        </p>

        <Link href={`/book/${identifier}`}>

          <button className="mt-5 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">

            Read Manuscript

          </button>

        </Link>

      </div>

    </div>
  );
}