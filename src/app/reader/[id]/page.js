"use client";

import { useParams } from "next/navigation";

export default function ReaderPage() {
  
  const { id } = useParams();

  async function downloadBook() {
    try {
      const response = await fetch(
        `https://archive.org/metadata/${id}`
      );

      const meta = await response.json();

      const pdfFile = meta.files?.find(
        (file) =>
          file.name &&
          file.name.toLowerCase().endsWith(".pdf")
      );

      if (!pdfFile) {
        alert("PDF version not available.");
        return;
      }

      window.open(
        `https://archive.org/download/${id}/${encodeURIComponent(
          pdfFile.name
        )}`,
        "_blank"
      );
    } catch (err) {
      console.error(err);
    }
  }

  if (!id) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
  <div className="flex min-h-screen flex-col bg-[#F8F5EF]">
    <div className="flex-1">
      <div className="flex flex-wrap items-center justify-between gap-5 border-b bg-white px-8 py-5">
        <h1 className="line-clamp-2 text-xl font-bold">
          {decodeURIComponent(id)}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={downloadBook}
            className="rounded-full bg-[#98003A] px-6 py-3 text-white"
          >
            📥 Download
          </button>

          <button
            onClick={() => {
              const favorites =
                JSON.parse(localStorage.getItem("favorites")) || [];

              if (!favorites.some((book) => book.id === id)) {
                favorites.push({
                  id,
                  title: decodeURIComponent(id),
                  cover: `https://archive.org/services/img/${id}`,
                });

                localStorage.setItem(
                  "favorites",
                  JSON.stringify(favorites)
                );
              }

              alert("Favorite Books & Manuscripts");
            }}
            className="rounded-full bg-yellow-400 px-6 py-3"
          >
            Add to Favorites
          </button>
        </div>
      </div>

      {/* Reader */}
      <div className="relative h-[85vh] overflow-hidden bg-white md:h-[calc(100vh-130px)]">
  <iframe
    src={`https://archive.org/embed/${id}?ui=embed`}
    className="h-full w-full border-0"
  />

  {/* Block title bar */}
  <div
    className="absolute top-0 left-0 z-50"
    style={{
      width: "100%",
      height: "40px",
      background: "transparent",
      pointerEvents: "all",
    }}
  />

  {/* Block left toolbar */}
  <div
    className="absolute left-0 top-[40px] z-50"
    style={{
      width: "55px",
      height: "150px",
      background: "transparent",
      pointerEvents: "all",
    }}
  />
</div>
    </div>

    <footer className="bg-[#98003A] text-white">
      <div className="mx-auto max-w-7xl px-8 py-20">
        <h3 className="text-4xl font-bold">
          Seth Shri Surajmal Taparia E-Granthalay
        </h3>

        <p className="mt-6 max-w-3xl text-lg text-stone-200">
          A Digital Repository of Sanskrit Manuscripts,
          Rare Books and Historical Collections.
        </p>

        <div className="mt-12 text-sm text-stone-300">
          © 2026 SMTASM • Preserving Knowledge For Future Generations
        </div>
      </div>
    </footer>
  </div>
);
}