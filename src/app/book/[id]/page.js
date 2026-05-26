"use client";

import { useEffect, useState } from "react";

export default function ReaderPage() {

  const [identifier, setIdentifier] =
    useState("");

  const [page, setPage] = useState(4);

  const [zoom, setZoom] = useState(60);

  const [darkMode, setDarkMode] =
    useState(true);

  const [totalPages, setTotalPages] =
    useState(500);

  // GET BOOK ID

  useEffect(() => {

    const pathname =
      window.location.pathname;

    const id =
      decodeURIComponent(
        pathname.split("/book/")[1]
      );

    setIdentifier(id);

  }, []);

  // FETCH PAGE COUNT

  useEffect(() => {

    async function fetchMetadata() {

      if (!identifier) return;

      try {

        const res =
          await fetch(
            `https://archive.org/metadata/${identifier}`
          );

        const data =
          await res.json();

        const pages =
          data.files?.filter((file) =>
            file.name?.includes("_w600.jpg")
          );

        if (pages?.length) {

          setTotalPages(
            pages.length
          );
        }

      } catch (err) {

        console.log(err);
      }
    }

    fetchMetadata();

  }, [identifier]);

  // PRELOAD NEXT PAGE

  useEffect(() => {

    if (!identifier) return;

    const nextImg = new Image();

    nextImg.src =
      `https://archive.org/download/${identifier}/page/n${page + 1}_w600.jpg`;

  }, [page, identifier]);

  // KEYBOARD CONTROLS

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

  }, [page, totalPages]);

  // NEXT PAGE

  function nextPage() {

    if (page < totalPages) {

      setPage((prev) => prev + 1);
    }
  }

  // PREVIOUS PAGE

  function prevPage() {

    if (page > 1) {

      setPage((prev) => prev - 1);
    }
  }

  // ZOOM

  function zoomIn() {

    setZoom((prev) => prev + 10);
  }

  function zoomOut() {

    if (zoom > 30) {

      setZoom((prev) => prev - 10);
    }
  }

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

    } catch {

      alert("Download failed");
    }
  }

  // IMAGE URL

  const image =
    identifier
      ? `https://archive.org/download/${identifier}/page/n${page}_w600.jpg`
      : "";

  return (

    <main
      className={`
        min-h-screen
        transition-all
        duration-300
        ${
          darkMode
            ? "bg-black text-white"
            : "bg-[#f5f5f5] text-black"
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
          bg-black/80
          border-b
          border-gray-800
          px-6
          py-5
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
          "
        >

          <div>

            <h1
              className="
                text-5xl
                lg:text-6xl
                font-bold
                tracking-tight
              "
            >
              Digital Manuscript Reader
            </h1>

            <p
              className="
                opacity-60
                mt-2
                text-lg
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
                bg-[#1a1a1a]
                hover:bg-[#2b2b2b]
                transition-all
                duration-200
                px-5
                py-3
                rounded-2xl
                text-lg
                font-medium
                border
                border-gray-700
                shadow-lg
              "
            >
              ←
            </button>

            <button
              onClick={nextPage}
              className="
                bg-[#1a1a1a]
                hover:bg-[#2b2b2b]
                transition-all
                duration-200
                px-5
                py-3
                rounded-2xl
                text-lg
                font-medium
                border
                border-gray-700
                shadow-lg
              "
            >
              →
            </button>

            <button
              onClick={zoomOut}
              className="
                bg-[#1a1a1a]
                hover:bg-[#2b2b2b]
                transition-all
                duration-200
                px-5
                py-3
                rounded-2xl
                text-lg
                font-medium
                border
                border-gray-700
                shadow-lg
              "
            >
              -
            </button>

            <div
              className="
                px-2
                font-semibold
                text-xl
              "
            >
              {zoom}%
            </div>

            <button
              onClick={zoomIn}
              className="
                bg-[#1a1a1a]
                hover:bg-[#2b2b2b]
                transition-all
                duration-200
                px-5
                py-3
                rounded-2xl
                text-lg
                font-medium
                border
                border-gray-700
                shadow-lg
              "
            >
              +
            </button>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="
                bg-blue-600
                hover:bg-blue-500
                transition-all
                duration-200
                px-5
                py-3
                rounded-2xl
                font-semibold
                shadow-xl
              "
            >
              {darkMode
                ? "Light"
                : "Dark"}
            </button>

            <button
              onClick={downloadBook}
              className="
                bg-red-600
                hover:bg-red-500
                transition-all
                duration-200
                px-6
                py-3
                rounded-2xl
                font-semibold
                shadow-red-500/20
                shadow-xl
              "
            >
              Download
            </button>

          </div>

        </div>

      </div>

      {/* IMAGE */}

      <div
        className="
          flex
          justify-center
          items-center
          p-8
          overflow-auto
          min-h-[75vh]
        "
      >

        {identifier ? (

          <img
            src={image}
            alt={`Page ${page}`}
            loading="eager"
            decoding="async"
            draggable={false}
            style={{
              width: `${zoom}%`,
              maxWidth: "1100px",
              height: "auto",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
            className="
              rounded-3xl
              shadow-[0_0_80px_rgba(255,255,255,0.08)]
              select-none
              border
              border-gray-800
              transition-all
              duration-300
            "
          />

        ) : (

          <div
            className="
              animate-pulse
              w-[700px]
              h-[900px]
              rounded-3xl
              bg-[#111]
            "
          />

        )}

      </div>

      {/* SLIDER */}

      <div
        className="
          sticky
          bottom-0
          bg-black/80
          backdrop-blur-xl
          border-t
          border-gray-800
          p-4
        "
      >

        <input
          type="range"
          min="1"
          max={totalPages}
          value={page}
          onChange={(e) =>
            setPage(Number(e.target.value))
          }
          className="w-full"
        />

      </div>

    </main>
  );
}