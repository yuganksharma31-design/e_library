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
  const archiveImage = identifier
    ? `https://archive.org/services/img/${identifier}`
    : null;

  const readerUrl =
    source === "mongo"
      ? `/reader?file=${encodeURIComponent(pdfUrl)}`
      : `/book/${identifier}`;

  return (
    <div
      className="
      group
      overflow-hidden
      rounded-[36px]
      bg-white
      shadow-xl
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      "
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={
            coverImage ||
            archiveImage ||
            "/placeholder.jpg"
          }
          alt={title}
          className="
          h-[320px]
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-8">

        {/* LABEL */}
        <div
          className="
          text-xs
          uppercase
          tracking-[6px]
          text-[#D6A700]
          mb-5
          "
        >
          New Arrival
        </div>

        {/* TITLE */}
        <h2
          className="
          text-[20px]
          font-bold
          leading-9
          text-[#111]
          line-clamp-2
          min-h-[80px]
          "
        >
          {title}
        </h2>

        {/* AUTHOR */}
        <p className="mt-4 text-stone-500">
          {creator || "Digital Collection"}
        </p>

        {/* BUTTON */}
        <Link href={readerUrl}>
          <div
            className="
            mt-8
            rounded-full
            bg-[#F5C400]
            py-4
            text-center
            font-semibold
            text-black
            transition-all
            duration-300
            group-hover:bg-[#98003A]
            group-hover:text-white
            "
          >
            Read →
          </div>
        </Link>

      </div>
    </div>
  );
}