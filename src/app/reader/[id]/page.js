"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ReaderPage() {

  const params = useParams();

  const id = params?.id;

  const [bookData, setBookData] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  const [zoom, setZoom] = useState(100);

  const [darkMode, setDarkMode] = useState(true);

  const [loading, setLoading] = useState(true);

  const [showControls, setShowControls] = useState(true);

  const [ocrText, setOcrText] = useState("");

  const [searchText, setSearchText] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [touchStart, setTouchStart] = useState(0);

  const [touchEnd, setTouchEnd] = useState(0);

  const totalPages = 20;
useEffect(() => {

  if (!id) return;

  localStorage.setItem(
    `reader-${id}`,
    JSON.stringify({
      currentPage,
      zoom,
      darkMode,
    })
  );

}, [currentPage, zoom, darkMode, id]);
useEffect(() => {

  if (!id) return;

  const saved =
    localStorage.getItem(`reader-${id}`);

  if (saved) {

    const parsed = JSON.parse(saved);

    setCurrentPage(parsed.currentPage || 0);

    setZoom(parsed.zoom || 100);

    setDarkMode(parsed.darkMode ?? true);
  }

}, [id]);

  // FETCH BOOK DATA
  useEffect(() => {

    const fetchBook = async () => {

      try {

        const response = await fetch(
          `https://archive.org/metadata/${id}`
        );

        const data = await response.json();

        setBookData(data);

        const savedPage =
          localStorage.getItem(
            `reader-${id}`
          );

        if (savedPage) {

          setCurrentPage(
            Number(savedPage)
          );
        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }

  }, [id]);

  // KEYBOARD NAVIGATION
  useEffect(() => {

    const handleKeyDown = (e) => {

      if (e.key === "ArrowRight") {

        setCurrentPage((prev) => {

          const next = prev + 2;

          localStorage.setItem(
            `reader-${id}`,
            next
          );

          return next;
        });
      }

      if (e.key === "ArrowLeft") {

        setCurrentPage((prev) => {

          const next =
            Math.max(prev - 2, 0);

          localStorage.setItem(
            `reader-${id}`,
            next
          );

          return next;
        });
      }

      if (e.key === "+") {

        setZoom((prev) => prev + 10);
      }

      if (e.key === "-") {

        setZoom((prev) =>
          Math.max(prev - 10, 20)
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [id]);

  // AUTO HIDE CONTROLS
  useEffect(() => {

    let timeout;

    const handleMouseMove = () => {

      setShowControls(true);

      clearTimeout(timeout);

      timeout = setTimeout(() => {

        setShowControls(false);

      }, 2500);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    handleMouseMove();

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };

  }, []);

  // PRELOAD NEXT PAGES
  useEffect(() => {

    const preload1 =
      new Image();

    preload1.src =
      `https://archive.org/download/${id}/page/n${currentPage + 2}.jpg`;

    const preload2 =
      new Image();

    preload2.src =
      `https://archive.org/download/${id}/page/n${currentPage + 3}.jpg`;

  }, [currentPage, id]);

  // FETCH OCR TEXT
  useEffect(() => {

    const fetchOCR = async () => {

      try {

        const response =
          await fetch(
            `https://archive.org/download/${id}/${id}_djvu.txt`
          );

        const text =
          await response.text();

        setOcrText(text);

      } catch (error) {

        console.log(error);
      }
    };

    if (id) {
      fetchOCR();
    }

  }, [id]);

  // MOBILE SWIPE
  const handleTouchStart = (e) => {

    setTouchStart(
      e.targetTouches[0].clientX
    );
  };

  const handleTouchMove = (e) => {

    setTouchEnd(
      e.targetTouches[0].clientX
    );
  };

  const handleTouchEnd = () => {

    if (touchStart - touchEnd > 50) {

      const next =
        currentPage + 2;

      setCurrentPage(next);

      localStorage.setItem(
        `reader-${id}`,
        next
      );
    }

    if (touchStart - touchEnd < -50) {

      const next =
        Math.max(currentPage - 2, 0);

      setCurrentPage(next);

      localStorage.setItem(
        `reader-${id}`,
        next
      );
    }
  };

  // OCR SEARCH
  function searchOCR() {

    if (!searchText.trim()) {

      setSearchResults([]);

      return;
    }

    const lowerText =
      ocrText.toLowerCase();

    const lowerSearch =
      searchText.toLowerCase();

    const results = [];

    let index =
      lowerText.indexOf(lowerSearch);

    while (index !== -1) {

      results.push(
        ocrText.substring(
          Math.max(0, index - 80),
          Math.min(
            ocrText.length,
            index + 120
          )
        )
      );

      index =
        lowerText.indexOf(
          lowerSearch,
          index + 1
        );
    }

    setSearchResults(results);
  }

  // DOWNLOAD
  async function downloadBook() {

    try {

      if (!id) {

        alert("Book not loaded");

        return;
      }

      const metaResponse =
        await fetch(
          `https://archive.org/metadata/${id}`
        );

      const meta =
        await metaResponse.json();

      let targetFile =
        meta.files.find(
          (file) =>
            file.name &&
            file.name
              .toLowerCase()
              .endsWith(".pdf")
        );

      if (!targetFile) {

        targetFile =
          meta.files.find(
            (file) =>
              file.name &&
              file.name
                .toLowerCase()
                .endsWith(".djvu")
          );
      }

      if (!targetFile) {

        targetFile =
          meta.files.find(
            (file) =>
              file.format ===
              "Single Page Processed JP2 ZIP"
          );
      }

      if (!targetFile) {

        alert("No downloadable file found");

        return;
      }

      const fileUrl =
        `https://archive.org/download/${id}/${encodeURIComponent(targetFile.name)}`;

      const a =
        document.createElement("a");

      a.href = fileUrl;

      a.setAttribute(
        "download",
        targetFile.name
      );

      a.setAttribute(
        "target",
        "_blank"
      );

      document.body.appendChild(a);

      a.click();

      a.remove();

    } catch (error) {

      console.log(error);

      alert("Download failed");
    }
  }

  const title =
    bookData?.metadata?.title ||
    "Digital Manuscript Reader";

  return (
    <main
      className={`h-screen overflow-hidden ${
        darkMode
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >

      {/* HEADER */}
      <header
        className={`
          border-b
          border-zinc-800
          px-4
          py-3
          transition-all
          duration-500
          ${
            showControls
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }
        `}
      >

        <h1
          className="
            max-w-6xl
            text-lg
            sm:text-2xl
            md:text-3xl
            font-bold
            leading-snug
            line-clamp-2
          "
        >
          {title}
        </h1>

        {/* CONTROLS */}
        <div className="mt-4 flex flex-wrap items-center gap-3">

          <div className="text-sm sm:text-lg text-zinc-400">
            Page {currentPage + 1}
          </div>

          <button
            onClick={() =>
              setZoom(Math.max(zoom - 10, 20))
            }
            className="
              rounded-xl
              bg-zinc-800
              px-4
              py-2
              text-lg
              transition
              hover:bg-zinc-700
            "
          >
            -
          </button>

          <div className="px-2 text-lg font-bold">
            {zoom}%
          </div>

          <button
            onClick={() =>
              setZoom(zoom + 10)
            }
            className="
              rounded-xl
              bg-zinc-800
              px-4
              py-2
              text-lg
              transition
              hover:bg-zinc-700
            "
          >
            +
          </button>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="
              rounded-xl
              bg-blue-600
              px-5
              py-2
              text-sm
              sm:text-base
              transition
              hover:bg-blue-500
            "
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          {/* FULLSCREEN */}
          <button
            onClick={() => {

              if (!document.fullscreenElement) {

                document.documentElement.requestFullscreen();

              } else {

                document.exitFullscreen();
              }
            }}
            className="
              rounded-xl
              bg-zinc-700
              px-5
              py-2
              text-sm
              sm:text-base
              transition
              hover:bg-zinc-600
            "
          >
            Fullscreen
          </button>

          {/* DOWNLOAD */}
          <button
            onClick={downloadBook}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-2
              text-sm
              sm:text-base
              transition
              hover:bg-red-500
            "
          >
            Download
          </button>
        </div>

        {/* PROGRESS */}
        <div className="mt-5">

          <div className="h-2 w-full rounded-full bg-zinc-800">

            <div
              className="
                h-2
                rounded-full
                bg-yellow-500
                transition-all
              "
              style={{
                width: `${(currentPage / totalPages) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      {/* VIEWER */}
      <section
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="
          relative
          flex
          h-[calc(100vh-120px)]
          overflow-hidden
          bg-[#050505]
        "
      >

        {/* THUMBNAILS */}
        <aside
          className="
            hidden
            md:flex
            w-32
            flex-col
            gap-3
            overflow-y-auto
            border-r
            border-zinc-800
            bg-black
            p-3
          "
        >

          {Array.from({ length: totalPages }).map((_, index) => (

            <button
              key={index}
              onClick={() => {

                setCurrentPage(index);

                localStorage.setItem(
                  `reader-${id}`,
                  index
                );
              }}
              className={`
                overflow-hidden
                rounded-lg
                border
                transition
                ${
                  currentPage === index
                    ? "border-blue-500"
                    : "border-zinc-800"
                }
              `}
            >

              <img
                src={`https://archive.org/download/${id}/page/n${index + 1}.jpg`}
                alt={`Page ${index + 1}`}
                className="w-full object-cover"
              />

              <div
                className="
                  bg-zinc-900
                  py-1
                  text-center
                  text-xs
                  text-white
                "
              >
                {index + 1}
              </div>
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <div
          className="
            relative
            flex
            flex-1
            items-center
            justify-center
            overflow-hidden
          "
        >

          {/* LEFT */}
          <button
            onClick={() => {

              const next =
                Math.max(currentPage - 2, 0);

              setCurrentPage(next);

              localStorage.setItem(
                `reader-${id}`,
                next
              );
            }}
            className={`
              absolute
              left-2
              z-20
              rounded-full
              bg-black/60
              px-4
              py-3
              text-2xl
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:bg-black
              ${
                showControls
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
          >
            ←
          </button>

          {/* RIGHT */}
          <button
            onClick={() => {

              const next =
                currentPage + 2;

              setCurrentPage(next);

              localStorage.setItem(
                `reader-${id}`,
                next
              );
            }}
            className={`
              absolute
              right-2
              z-20
              rounded-full
              bg-black/60
              px-4
              py-3
              text-2xl
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:bg-black
              ${
                showControls
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
          >
            →
          </button>

          {/* BOOK */}
          <div
            className="
  flex
  h-full
  w-full
  items-center
  justify-center
    gap-0
              rounded-xl
              bg-zinc-900
              p-2
              shadow-2xl
            "
          >

            {loading ? (

              <div className="flex flex-col items-center gap-4">

                <div
                  className="
                    h-14
                    w-14
                    animate-spin
                    rounded-full
                    border-4
                    border-zinc-700
                    border-t-white
                  "
                />

                <div className="text-xl text-zinc-300">
                  Loading manuscript...
                </div>
              </div>

            ) : (

              <>
                {/* LEFT PAGE */}
                <img
                  src={`https://archive.org/download/${id}/page/n${currentPage + 1}.jpg`}
                  alt="left"
                  style={{
  maxHeight: "78vh",
  maxWidth: "46vw",
  width: "auto",
  height: "auto",
  transform: `scale(${zoom / 100})`,
  objectFit: "contain",
}}
                  className="
                    max-h-[78vh]
                    max-w-full
                    rounded-l-lg
                    border-r
                    border-zinc-700
                    bg-white
                    shadow-2xl
                    transition-all
                    duration-300
                    drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]
                  "
                />

                {/* RIGHT PAGE */}
                <img
                  src={`https://archive.org/download/${id}/page/n${currentPage + 2}.jpg`}
                  alt="right"
                  style={{
  maxHeight: "78vh",
  maxWidth: "46vw",
  width: "auto",
  height: "auto",
  transform: `scale(${zoom / 100})`,
  objectFit: "contain",
}}
                  className="
                    hidden
                    md:block
                    max-h-[78vh]
                    max-w-full
                    rounded-r-lg
                    bg-white
                    shadow-2xl
                    transition-all
                    duration-300
                    drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]
                  "
                />
              </>
            )}
          </div>

          {/* PAGE NUMBER */}
          <div
            className="
              absolute
              bottom-4
              rounded-full
              bg-black/60
              px-4
              py-2
              text-sm
              text-white
              backdrop-blur-md
            "
          >
            Pages {currentPage + 1}

            <span className="hidden md:inline">
              {" "} - {currentPage + 2}
            </span>
          </div>
        </div>

        {/* METADATA */}
        <aside
          className="
            hidden
            xl:flex
            w-80
            flex-col
            overflow-y-auto
            border-l
            border-zinc-800
            bg-black
            p-6
          "
        >

          <h2 className="text-2xl font-bold">
            Manuscript Details
          </h2>

          <div className="mt-6 space-y-5">

            <div>
              <p className="text-sm text-zinc-500">
                Title
              </p>

              <p className="mt-1 text-base">
                {bookData?.metadata?.title || "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Creator
              </p>

              <p className="mt-1 text-base">
                {bookData?.metadata?.creator || "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Language
              </p>

              <p className="mt-1 text-base">
                {bookData?.metadata?.language || "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Description
              </p>

              <p className="mt-1 text-sm leading-7 text-zinc-300">
                {
                  bookData?.metadata?.description ||
                  "No description available."
                }
              </p>
            </div>

            {/* SEARCH */}
            <div className="mt-4 flex gap-2">

              <input
                type="text"
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                placeholder="Search manuscript..."
                className="
                  flex-1
                  rounded-lg
                  border
                  border-zinc-700
                  bg-zinc-900
                  px-4
                  py-2
                  text-sm
                  outline-none
                "
              />

              <button
                onClick={searchOCR}
                className="
                  rounded-lg
                  bg-yellow-500
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-black
                "
              >
                Search
              </button>
            </div>

            {/* OCR */}
            <div
              className="
                max-h-80
                overflow-y-auto
                rounded-lg
                bg-zinc-900
                p-4
                text-sm
                leading-7
                text-zinc-300
              "
            >
              {ocrText
                ? ocrText.slice(0, 5000)
                : "OCR text not available"}
            </div>

            {/* SEARCH RESULTS */}
            {searchResults.length > 0 && (

              <div className="space-y-3">

                {searchResults
                  .slice(0, 10)
                  .map((result, index) => (

                    <div
                      key={index}
                      className="
                        rounded-lg
                        bg-zinc-900
                        p-3
                        text-sm
                        leading-7
                        text-zinc-300
                      "
                    >
                      ...{result}...
                    </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}