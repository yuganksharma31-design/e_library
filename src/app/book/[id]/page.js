"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookPage() {
  const params = useParams();

  const identifier = decodeURIComponent(params.id);

  const [page, setPage] = useState(1);

  const [zoom, setZoom] = useState(
    typeof window !== "undefined" &&
      window.innerWidth < 768
      ? 100
      : 48
  );

  const [darkMode, setDarkMode] =
    useState(true);

  const [totalPages, setTotalPages] =
    useState(500);

  const [isMobile, setIsMobile] =
    useState(false);

  // DEVICE DETECTION

  useEffect(() => {
    function handleResize() {
      setIsMobile(
        window.innerWidth < 1024
      );
    }

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  // IMAGE URLS

  const leftImage =
    `https://archive.org/download/${identifier}/page/n${page}_w1200.jpg`;

  const rightImage =
    `https://archive.org/download/${identifier}/page/n${page + 1}_w1200.jpg`;

  // PRELOAD

  useEffect(() => {
    const preload1 = new Image();

    preload1.src =
      `https://archive.org/download/${identifier}/page/n${page + 1}_w1200.jpg`;

    const preload2 = new Image();

    preload2.src =
      `https://archive.org/download/${identifier}/page/n${page + 2}_w1200.jpg`;
  }, [page, identifier]);

  // KEYBOARD

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight") {
        nextPage();
      }

      if (e.key === "ArrowLeft") {
        prevPage();
      }
    }

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, [page, isMobile]);

  // NEXT

  function nextPage() {
    if (page < totalPages - 1) {
      setPage((prev) =>
        isMobile
          ? prev + 1
          : prev + 2
      );
    }
  }

  // PREV

  function prevPage() {
    if (page > 1) {
      setPage((prev) =>
        isMobile
          ? prev - 1
          : prev - 2
      );
    }
  }

  // ZOOM

  function zoomIn() {
    setZoom((prev) => prev + 5);
  }

  function zoomOut() {
    if (zoom > 30) {
      setZoom((prev) => prev - 5);
    }
  }

  // DOWNLOAD

  async function downloadBook() {

  try {

    window.open(
      `/api/download/${encodeURIComponent(identifier)}`,
      "_blank"
    );

  } catch (error) {

    console.log(error);

    alert("Download failed");
  }
}

  return (
    <main
      className={`
        h-screen
        overflow-hidden
        flex
        flex-col
        transition-all
        duration-300
        ${
          darkMode
            ? "bg-black text-white"
            : "bg-[#f5f1e8] text-black"
        }
      `}
    >

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          xl:flex-row
          justify-between
          xl:items-center
          gap-5
          px-4
          md:px-8
          py-5
          border-b
          border-gray-800
          bg-black
          shrink-0
        "
      >

        <div>

          <h1
            className="
              text-3xl
              md:text-6xl
              font-bold
              leading-none
            "
          >
            Digital Manuscript Reader
          </h1>

          <p
            className="
              text-lg
              md:text-2xl
              text-gray-400
              mt-3
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

          <button
            onClick={prevPage}
            className="
              px-5
              py-3
              rounded-2xl
              bg-[#111827]
              hover:bg-[#1f2937]
              text-lg
              font-semibold
            "
          >
            ← Prev
          </button>

          <button
            onClick={nextPage}
            className="
              px-5
              py-3
              rounded-2xl
              bg-[#111827]
              hover:bg-[#1f2937]
              text-lg
              font-semibold
            "
          >
            Next →
          </button>

          <button
            onClick={zoomOut}
            className="
              px-5
              py-3
              rounded-2xl
              bg-[#111827]
              hover:bg-[#1f2937]
              text-xl
            "
          >
            -
          </button>

          <div
            className="
              w-16
              text-center
              font-bold
              text-xl
            "
          >
            {zoom}%
          </div>

          <button
            onClick={zoomIn}
            className="
              px-5
              py-3
              rounded-2xl
              bg-[#111827]
              hover:bg-[#1f2937]
              text-xl
            "
          >
            +
          </button>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="
              px-5
              py-3
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              text-lg
              font-semibold
            "
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          <button
            onClick={downloadBook}
            className="
              px-6
              py-3
              rounded-2xl
              bg-red-600
              hover:bg-red-700
              text-lg
              font-bold
              shadow-[0_0_25px_rgba(255,0,0,0.4)]
            "
          >
            Download
          </button>

        </div>

      </div>

      {/* VIEWER */}

      <div
        className="
          flex-1
          overflow-auto
          flex
          justify-center
          items-center
          bg-black
          p-2
        "
      >

        {isMobile ? (

          <img
            src={leftImage}
            alt={`Page ${page}`}
            loading="eager"
            draggable={false}
            className="
              max-w-full
              max-h-full
              object-contain
              rounded-xl
              shadow-2xl
              select-none
            "
            style={{
              width: `${zoom}%`,
            }}
          />

        ) : (

          <div
            className="
              flex
              justify-center
              items-center
              gap-1
              w-full
              h-full
            "
          >

            <img
              src={leftImage}
              alt={`Page ${page}`}
              loading="eager"
              draggable={false}
              className="
                object-contain
                rounded-l-xl
                shadow-2xl
                select-none
              "
              style={{
                width: `${zoom / 2}%`,
                maxHeight: "100%",
              }}
            />

            <img
              src={rightImage}
              alt={`Page ${page + 1}`}
              loading="lazy"
              draggable={false}
              className="
                object-contain
                rounded-r-xl
                shadow-2xl
                select-none
              "
              style={{
                width: `${zoom / 2}%`,
                maxHeight: "100%",
              }}
            />

          </div>

        )}

      </div>

      {/* FOOTER */}

      <div
        className="
          border-t
          border-gray-800
          bg-black
          py-3
          shrink-0
        "
      >

        <div
          className="
            flex
            justify-center
            items-center
            gap-5
          "
        >

          <button
            onClick={prevPage}
            className="
              px-5
              py-2
              rounded-xl
              bg-[#111827]
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
              px-5
              py-2
              rounded-xl
              bg-[#111827]
            "
          >
            Next →
          </button>

        </div>

      </div>

    </main>
  );
}