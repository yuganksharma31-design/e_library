"use client";

export default function BookCard({
  _id,
  title,
  creator,
  identifier,
  coverImage,
  pdfUrl,
  source,
}) {

  // ARCHIVE COVER

  const archiveImage =
    identifier
      ? `https://archive.org/services/img/${identifier}`
      : null;

  // FINAL READER URL

  let readerUrl = "#";

  if (source === "mongo" && pdfUrl) {
    readerUrl = pdfUrl;
  }

  if (identifier) {
    readerUrl = `/book/${identifier}`;
  }

  return (

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* COVER IMAGE */}

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

        <a
          href={readerUrl}
          target="_blank"
          rel="noopener noreferrer"
        >

          <button
            className="mt-5 w-full bg-black text-white py-3 rounded-xl font-semibold"
          >
            Read Book
          </button>

        </a>

      </div>

    </div>
  );
}