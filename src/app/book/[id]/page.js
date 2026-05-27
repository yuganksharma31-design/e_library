"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookPage() {

  const params = useParams();

  const identifier =
    decodeURIComponent(params.id);

  const [page, setPage] =
    useState(1);

  const [zoom, setZoom] =
    useState(
      typeof window !== "undefined" &&
      window.innerWidth < 768
        ? 100
        : 55
    );

  const [darkMode, setDarkMode] =
    useState(true);

  const [totalPages] =
    useState(500);

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 1024;

  // IMAGE URLS

  const leftImage =
    `https://archive.org/download/${identifier}/page/n${page}_w1200.jpg`;

  const rightImage =
    `https://archive.org/download/${identifier}/page/n${page + 1}_w1200.jpg`;

  // PRELOAD

  useEffect(() => {

    const img1 = new Image();

    img1.src =
      `https://archive.org/download/${identifier}/page/n${page + 1}_w1200.jpg`;

    const img2 = new Image();

    img2.src =
      `https://archive.org/download/${identifier}/page/n${page + 2}_w1200.jpg`;

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

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );

  }, [page]);

  // FUNCTIONS

  const nextPage = () => {

    if (page < totalPages - 1) {

      setPage((prev) =>
        isMobile
          ? prev + 1
          : prev + 2
      );
    }
  };

  const prevPage = () => {

    if (page > 1) {

      setPage((prev) =>
        isMobile
          ? prev - 1
          : prev - 2
      );
    }
  };

  const zoomIn = () => {

    setZoom((prev) => prev + 5);
  };

  const zoomOut = () => {

    if (zoom > 30) {

      setZoom((prev) => prev - 5);
    }
  };

  // DOWNLOAD

  async function downloadBook() {

    try {

      const response =
        await fetch(
          `/api/download/${identifier}`
        );

      if (!response.ok) {

        alert(
          "PDF not available"
        );

        return;
      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        `${identifier}.pdf`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.log(error);

      alert("Download failed");
    }
  }

  return (

    <div
      className={`
        min-h-screen
        transition-all
        duration-300
        overflow-hidden
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
            xl:flex-row
            justify-between
            items-start
            xl:items-center
            gap-6
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
                md:text-6xl
                font-bold
                tracking-tight
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

            {/* PREV */}

            <button
              onClick={prevPage}
              className="
                px-6
                py-4
                rounded-2xl
                bg-[#111827]
                hover:bg-[#1f2937]
                transition-all
                text-xl
                font-semibold
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
                transition-all
                text-xl
                font-semibold
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
                transition-all
                text-2xl
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
                transition-all
                text-2xl
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
                transition-all
                text-xl
                font-semibold
              "
            >
              {darkMode
                ? "Light"
                : "Dark"}
            </button>

            {/* DOWNLOAD */}

            <button
              onClick={downloadBook}
              className="
                px-8
                py-4
                rounded-2xl
                bg-red-600
                hover:bg-red-700
                transition-all
                duration-300
                text-xl
                font-bold
                shadow-[0_0_30px_rgba(255,0,0,0.4)]
              "
            >
              Download
            </button>

          </div>

        </div>

      </div>

      {/* VIEWER */}

      <div
        className="
          flex
          justify-center
          items-center
          overflow-hidden
          py-4
          px-2
          bg-black
        "
        style={{
          height: "calc(100vh - 210px)",
        }}
      >

        {/* MOBILE */}

        {isMobile ? (

          <img
            src={leftImage}
            alt={`Page ${page}`}
            loading="eager"
            decoding="async"
            draggable={false}
            style={{
              width: "100%",
              height:
                "calc(100vh - 240px)",
              objectFit: "contain",
            }}
            className="
              rounded-xl
              shadow-2xl
              select-none
            "
          />

        ) : (

          /* DESKTOP BOOK VIEW */

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

            {/* LEFT PAGE */}

            <img
              src={leftImage}
              alt={`Page ${page}`}
              loading="eager"
              decoding="async"
              draggable={false}
              style={{
                width: `${zoom}%`,
                height:
                  "calc(100vh - 240px)",
                objectFit: "contain",
              }}
              className="
                rounded-l-xl
                shadow-2xl
                border-r
                border-black
                select-none
              "
            />

            {/* RIGHT PAGE */}

            <img
              src={rightImage}
              alt={`Page ${page + 1}`}
              loading="lazy"
              decoding="async"
              draggable={false}
              style={{
                width: `${zoom}%`,
                height:
                  "calc(100vh - 240px)",
                objectFit: "contain",
              }}
              className="
                rounded-r-xl
                shadow-2xl
                select-none
              "
            />

          </div>

        )}

      </div>

      {/* BOTTOM NAV */}

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
              transition-all
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
              transition-all
            "
          >
            Next →
          </button>

        </div>

      </div>

    </div>
  );
}