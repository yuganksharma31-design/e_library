"use client";

import { useEffect, useState } from "react";

export default function ReaderPage() {

  const [identifier, setIdentifier] = useState("");

  const [page, setPage] = useState(1);

  const [zoom, setZoom] = useState(60);

  const [darkMode, setDarkMode] = useState(true);

  const [loaded, setLoaded] = useState(false);

  const totalPages = 500;

  // GET IDENTIFIER

  useEffect(() => {

    const pathname = window.location.pathname;

    const id = decodeURIComponent(
      pathname.split("/book/")[1]
    );

    setIdentifier(id);

  }, []);

  // RESET LOADING WHEN PAGE CHANGES

  useEffect(() => {

    setLoaded(false);

  }, [page]);

  // PRELOAD NEXT PAGES

  useEffect(() => {

    if (!identifier) return;

    for (let i = 1; i <= 3; i++) {

      const img = new Image();

      img.src =
        `https://archive.org/download/${identifier}/page/n${page + i}_w1200.jpg`;
    }

  }, [page, identifier]);

  // IMAGE URL

  const image =
    `https://archive.org/download/${identifier}/page/n${page}_w1200.jpg`;

  // NEXT PAGE

  function nextPage() {

    if (page < totalPages) {

      setPage(prev => prev + 1);
    }
  }

  // PREVIOUS PAGE

  function prevPage() {

    if (page > 1) {

      setPage(prev => prev - 1);
    }
  }

  // ZOOM IN

  function zoomIn() {

    setZoom(prev => prev + 10);
  }

  // ZOOM OUT

  function zoomOut() {

    if (zoom > 30) {

      setZoom(prev => prev - 10);
    }
  }

  // DARK MODE

  function toggleTheme() {

    setDarkMode(prev => !prev);
  }

  // DOWNLOAD

  function downloadBook() {

    window.open(
      `https://archive.org/download/${identifier}/${identifier}.pdf`,
      "_blank"
    );
  }

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

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );

  }, [page]);

  return (

    <main
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-black text-white"
          : "bg-[#f5f1e8] text-black"
      }`}
    >

      {/* HEADER */}

      <div
        className="
          sticky
          top-0
          z-50
          bg-black/80
          backdrop-blur-xl
          border-b
          border-white/10
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
            p-5
          "
        >

          {/* TITLE */}

          <div>

            <h1
              className="
                text-3xl
                md:text-6xl
                font-light
                tracking-tight
              "
            >
              Digital Manuscript Reader
            </h1>

            <p
              className="
                opacity-70
                mt-2
                text-lg
                md:text-2xl
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
                bg-white/10
                hover:bg-white/20
                border
                border-white/10
                backdrop-blur-lg
                px-5
                py-3
                rounded-xl
                transition-all
                duration-200
              "
            >
              ←
            </button>

            <button
              onClick={nextPage}
              className="
                bg-white/10
                hover:bg-white/20
                border
                border-white/10
                backdrop-blur-lg
                px-5
                py-3
                rounded-xl
                transition-all
                duration-200
              "
            >
              →
            </button>

            <button
              onClick={zoomOut}
              className="
                bg-white/10
                hover:bg-white/20
                border
                border-white/10
                backdrop-blur-lg
                px-5
                py-3
                rounded-xl
                transition-all
                duration-200
              "
            >
              -
            </button>

            <div
              className="
                text-xl
                md:text-2xl
                font-bold
                px-2
              "
            >
              {zoom}%
            </div>

            <button
              onClick={zoomIn}
              className="
                bg-white/10
                hover:bg-white/20
                border
                border-white/10
                backdrop-blur-lg
                px-5
                py-3
                rounded-xl
                transition-all
                duration-200
              "
            >
              +
            </button>

            <button
              onClick={toggleTheme}
              className="
                bg-blue-600
                hover:bg-blue-500
                px-5
                py-3
                rounded-xl
                transition-all
                duration-200
              "
            >
              {darkMode ? "Light" : "Dark"}
            </button>

            <button
              onClick={downloadBook}
              className="
                bg-red-600
                hover:bg-red-500
                px-5
                py-3
                rounded-xl
                transition-all
                duration-200
              "
            >
              Download
            </button>

          </div>

        </div>

      </div>

      {/* READER */}

      <div
        className="
          flex
          justify-center
          items-center
          overflow-auto
          min-h-screen
          p-6
        "
      >

        {!loaded && (

          <div
            className="
              text-2xl
              animate-pulse
              opacity-70
            "
          >
            Loading Manuscript...
          </div>

        )}

        <img
          src={image}
          alt="manuscript"
          loading="lazy"
          draggable={false}
          onLoad={() => setLoaded(true)}
          style={{
            width: `${zoom}%`,
            maxWidth: "1400px",
            height: "auto",
            display: loaded ? "block" : "none",
          }}
          className="
            rounded-2xl
            shadow-2xl
            select-none
            transition-all
            duration-300
          "
        />

      </div>

      {/* PAGE SLIDER */}

      <div
        className="
          sticky
          bottom-0
          bg-black/80
          backdrop-blur-xl
          border-t
          border-white/10
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