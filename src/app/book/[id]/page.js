"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookPage() {

  const params = useParams();

  const identifier = params.id;

  const [page, setPage] = useState(1);

  const [zoom, setZoom] = useState(
    typeof window !== "undefined" &&
    window.innerWidth < 768
      ? 95
      : 60
  );

  const [darkMode, setDarkMode] = useState(true);

  const [totalPages, setTotalPages] = useState(500);

  // IMAGE URL

  const image =
    `https://archive.org/download/${identifier}/page/n${page}_w1200.jpg`;

  // PRELOAD NEXT PAGE

  useEffect(() => {

    const nextImage = new Image();

    nextImage.src =
      `https://archive.org/download/${identifier}/page/n${page + 1}_w1200.jpg`;

  }, [page, identifier]);

  // KEYBOARD SUPPORT

  useEffect(() => {

    const handleKey = (e) => {

      if (e.key === "ArrowRight") {
        nextPage();
      }

      if (e.key === "ArrowLeft") {
        prevPage();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);

  }, [page]);

  // FUNCTIONS

  const nextPage = () => {

    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {

    if (page > 1) {
      setPage(page - 1);
    }
  };

  const zoomIn = () => {

    setZoom((prev) => prev + 10);
  };

  const zoomOut = () => {

    if (zoom > 30) {
      setZoom((prev) => prev - 10);
    }
  };

  return (

    <div
      className={`
        min-h-screen
        transition-all
        duration-300
        ${darkMode
          ? "bg-black text-white"
          : "bg-gray-100 text-black"}
      `}
    >

      {/* HEADER */}

      <div
        className="
          sticky
          top-0
          z-50
          backdrop-blur-xl
          border-b
          border-gray-800
          bg-black/90
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row
            justify-between
            items-start
            lg:items-center
            gap-5
            px-4
            md:px-8
            py-5
          "
        >

          {/* TITLE */}

          <div>

            <h1
              className="
                text-3xl
                md:text-5xl
                font-bold
                tracking-tight
              "
            >
              Digital Manuscript Reader
            </h1>

            <p
              className="
                text-lg
                md:text-2xl
                text-gray-400
                mt-2
              "
            >
              Page {page} of {totalPages}
            </p>

          </div>

          {/* CONTROLS */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            {/* PREV */}

            <button
              onClick={prevPage}
              className="
                px-6
                py-4
                rounded-2xl
                bg-[#111827]
                hover:bg-[#1f2937]
                transition
                text-xl
                font-semibold
                shadow-lg
              "
            >
              ← Prev
            </button>

            {/* NEXT */}

            <button
              onClick={nextPage}
              className="
                px-6
                py-4
                rounded-2xl
                bg-[#111827]
                hover:bg-[#1f2937]
                transition
                text-xl
                font-semibold
                shadow-lg
              "
            >
              Next →
            </button>

            {/* ZOOM OUT */}

            <button
              onClick={zoomOut}
              className="
                px-5
                py-4
                rounded-2xl
                bg-[#111827]
                hover:bg-[#1f2937]
                transition
                text-2xl
                shadow-lg
              "
            >
              -
            </button>

            {/* ZOOM */}

            <span
              className="
                text-2xl
                font-bold
                w-20
                text-center
              "
            >
              {zoom}%
            </span>

            {/* ZOOM IN */}

            <button
              onClick={zoomIn}
              className="
                px-5
                py-4
                rounded-2xl
                bg-[#111827]
                hover:bg-[#1f2937]
                transition
                text-2xl
                shadow-lg
              "
            >
              +
            </button>

            {/* THEME */}

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="
                px-6
                py-4
                rounded-2xl
                bg-blue-600
                hover:bg-blue-700
                transition
                text-xl
                font-semibold
                shadow-lg
              "
            >
              {darkMode ? "Light" : "Dark"}
            </button>

            {/* DOWNLOAD */}

            <a
              href={`https://archive.org/download/${identifier}`}
              target="_blank"
              className="
                px-6
                py-4
                rounded-2xl
                bg-red-600
                hover:bg-red-700
                transition
                text-xl
                font-semibold
                shadow-[0_0_30px_rgba(255,0,0,0.4)]
              "
            >
              Download
            </a>

          </div>

        </div>

      </div>

      {/* VIEWER */}

      <div
        className="
          flex
          justify-center
          items-center
          px-2
          md:px-6
          py-8
          overflow-auto
          min-h-[80vh]
          bg-gradient-to-b
          from-black
          to-[#050505]
        "
      >

        {/* MOBILE SINGLE PAGE */}

        <div className="block lg:hidden">

          <img
            src={image}
            alt={`Page ${page}`}
            loading="eager"
            decoding="async"
            draggable={false}
            style={{
              width: `${zoom}%`,
              maxWidth: "100%",
              height: "auto",
            }}
            className="
              rounded-2xl
              shadow-2xl
              border
              border-gray-800
              transition-all
              duration-300
              ease-in-out
            "
          />

        </div>

        {/* DESKTOP BOOK VIEW */}

        <div
          className="
            hidden
            lg:flex
            items-start
            justify-center
            gap-1
            bg-[#111]
            p-6
            rounded-3xl
            shadow-[0_0_80px_rgba(255,255,255,0.06)]
          "
        >

          {/* LEFT PAGE */}

          <img
            src={`https://archive.org/download/${identifier}/page/n${page}_w1200.jpg`}
            alt={`Page ${page}`}
            loading="eager"
            decoding="async"
            draggable={false}
            style={{
              width: `${zoom}%`,
              maxWidth: "650px",
              height: "auto",
            }}
            className="
              rounded-l-2xl
              border-r
              border-black
              shadow-xl
              transition-all
              duration-300
              ease-in-out
            "
          />

          {/* RIGHT PAGE */}

          <img
            src={`https://archive.org/download/${identifier}/page/n${page + 1}_w1200.jpg`}
            alt={`Page ${page + 1}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{
              width: `${zoom}%`,
              maxWidth: "650px",
              height: "auto",
            }}
            className="
              rounded-r-2xl
              shadow-xl
              transition-all
              duration-300
              ease-in-out
            "
          />

        </div>

      </div>

      {/* BOTTOM NAVIGATION */}

      <div
        className="
          sticky
          bottom-0
          z-50
          bg-black/90
          backdrop-blur-xl
          border-t
          border-gray-800
          py-4
        "
      >

        <div
          className="
            flex
            justify-center
            items-center
            gap-4
          "
        >

          <button
            onClick={prevPage}
            className="
              px-6
              py-3
              rounded-xl
              bg-[#111827]
              hover:bg-[#1f2937]
              transition
            "
          >
            ← Prev
          </button>

          <div
            className="
              text-lg
              font-semibold
            "
          >
            {page} / {totalPages}
          </div>

          <button
            onClick={nextPage}
            className="
              px-6
              py-3
              rounded-xl
              bg-[#111827]
              hover:bg-[#1f2937]
              transition
            "
          >
            Next →
          </button>

        </div>

      </div>

    </div>
  );
}