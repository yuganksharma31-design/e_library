
  // PREVIOUS PAGE

  function prevPage() {

    if (page > 1) {

      setPage((prev) => prev - 1);
    }
  }

  // ZOOM IN

  function zoomIn() {

    setZoom((prev) => prev + 10);
  }

  // ZOOM OUT

  function zoomOut() {

    if (zoom > 30) {

      setZoom((prev) => prev - 10);
    }
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

  // DOWNLOAD BOOK

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
      className={`min-h-screen ${
        darkMode
          ? "bg-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-5 border-b border-gray-800 bg-[#111]">

        <div>

          <h1 className="text-3xl font-bold">

            Digital Manuscript Reader

          </h1>

          <p className="opacity-70 mt-1">

            Page {page} of {totalPages}

          </p>

        </div>

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

          <div className="px-2 font-semibold">

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

      <div className="flex justify-center items-center p-6 overflow-auto min-h-[70vh]">

        {identifier ? (

          <img
            src={image}
            alt={`Page ${page}`}
            loading="eager"
            draggable={false}
            style={{
              width: `${zoom}%`,
              maxWidth: "1000px",
              height: "auto",
            }}
            className="
              rounded-xl
              shadow-2xl
              select-none
            "
          />

        ) : (

          <div className="text-2xl">

            Loading manuscript...

          </div>
        )}

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