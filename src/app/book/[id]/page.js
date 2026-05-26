"use client";

import manuscripts from "../../../data/manuscripts.json";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function BookPage() {

  const params = useParams();

  const [book, setBook] = useState(null);

  const [page, setPage] = useState(0);

  const [zoom, setZoom] = useState(60);

  useEffect(() => {

    const foundBook = manuscripts.find(
      (item) => item.id === params.id
    );

    setBook(foundBook);

  }, [params.id]);

  if (!book) {

    return (

      <div className="bg-black min-h-screen flex items-center justify-center text-white text-4xl">

        Loading...

      </div>
    );
  }

  return (

    <div className="bg-black min-h-screen text-white">

      {/* TOP BAR */}

      <div className="sticky top-0 z-50 bg-[#111] border-b border-gray-800 px-4 py-5 flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-bold">
            Digital Manuscript Reader
          </h1>

          <p className="text-2xl text-gray-300 mt-2">

            Page {page + 1} of {book.pages.length}

          </p>

        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setPage((p) =>
                Math.max(0, p - 1)
              )
            }
            className="bg-[#2f3b52] px-6 py-4 rounded-xl text-3xl"
          >
            ←
          </button>

          <button
            onClick={() =>
              setPage((p) =>
                Math.min(
                  book.pages.length - 1,
                  p + 1
                )
              )
            }
            className="bg-[#2f3b52] px-6 py-4 rounded-xl text-3xl"
          >
            →
          </button>

          <button
            onClick={() =>
              setZoom((z) =>
                Math.max(30, z - 10)
              )
            }
            className="bg-[#2f3b52] px-6 py-4 rounded-xl text-3xl"
          >
            -
          </button>

          <div className="text-3xl font-bold">
            {zoom}%
          </div>

          <button
            onClick={() =>
              setZoom((z) =>
                Math.min(150, z + 10)
              )
            }
            className="bg-[#2f3b52] px-6 py-4 rounded-xl text-3xl"
          >
            +
          </button>

          <button
            className="bg-blue-600 px-6 py-4 rounded-xl text-2xl"
          >
            Light
          </button>

          <a
            href={book.download || "#"}
            target="_blank"
            className="bg-red-600 px-6 py-4 rounded-xl text-2xl font-bold"
          >
            Download
          </a>

        </div>

      </div>

      {/* PAGE */}

      <div className="flex justify-center items-start py-10 overflow-auto">

        <img
          src={book.pages[page]}
          alt="manuscript page"
          style={{
            width: `${zoom}%`,
          }}
          className="rounded-xl shadow-2xl"
        />

      </div>

    </div>
  );
}