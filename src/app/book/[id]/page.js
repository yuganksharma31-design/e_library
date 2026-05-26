"use client";

import { useEffect, useState } from "react";

export default function ReaderPage() {

  const [identifier, setIdentifier] = useState("");

  const [page, setPage] = useState(1);

  const [zoom, setZoom] = useState(60);

  const [darkMode, setDarkMode] = useState(true);

  const totalPages = 500;

  // GET IDENTIFIER

  useEffect(() => {

    const pathname = window.location.pathname;

    const id = decodeURIComponent(
      pathname.split("/book/")[1]
    );

    setIdentifier(id);

  }, []);

  // THIS IS THE CORRECT IMAGE URL

  const image =
    `https://archive.org/download/${identifier}/page/n${page}.jpg`;

  // PRELOAD NEXT PAGE

  useEffect(() => {

    if (!identifier) return;

    const img = new Image();

    img.src =
      `https://archive.org/download/${identifier}/page/n${page + 1}.jpg`;

  }, [page, identifier]);

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

  // ZOOM

  function zoomIn() {

    setZoom(prev => prev + 10);
  }

  function zoomOut() {

    if (zoom > 30) {

      setZoom(prev => prev - 10);
    }
  }

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

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );

  }, [page]);

  // DOWNLOAD

  function downloadBook() {

    window.open(
      `https://archive.org/download/${identifier}/${identifier}.pdf`,
      "_blank"
    );
  }

  return (

    <main
      className={`min-h-screen ${
        darkMode
          ? "bg-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-5 border-b border-gray-800 bg-[#111]">

        <div>

          <h1 className="text-5xl font-light">

            Digital Manuscript Reader

          </h1>

          <p className="opacity-70 mt-2 text-2xl">

            Page {page} of {totalPages}

          </p>

        </div>

        {/* CONTROLS */}

        <div className="flex flex-wrap items-center gap-3">

          <button
            onClick={prevPage}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            ←
          </button>

          <button
            onClick={nextPage}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            →
          </button>

          <button
            onClick={zoomOut}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            -
          </button>

          <div className="px-2 font-bold text-2xl">

            {zoom}%

          </div>

          <button
            onClick={zoomIn}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            +
          </button>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg"
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          <button
            onClick={downloadBook}
            className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg"
          >
            Download
          </button>

        </div>

      </div>

      {/* IMAGE */}

      <div className="flex justify-center items-center p-6 overflow-auto">

        <img
          src={image}
          alt="manuscript"
          draggable={false}
          loading="eager"
          style={{
            width: `${zoom}%`,
            maxWidth: "1200px",
            height: "auto",
          }}
          className="
            rounded-xl
            shadow-2xl
            select-none
          "
        />

      </div>

      {/* SLIDER */}

      <div className="bg-[#111] border-t border-gray-800 p-4">

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