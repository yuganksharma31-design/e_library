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

                  alert("Favorite Books & Manuscripts");
                } else {
                  alert("Favorite Books & Manuscripts");
                }
              }}
              className="rounded-full bg-yellow-400 px-6 py-3"
            >
              Add to Favorites
            </button>
          </div>
        </div>
{/* 🔍 Search icon */}
<div
  className="fixed z-50"
  style={{
    top: "210px",
    left: "0px",
    width: "70px",
    height: "70px",
    background: "transparent",
    pointerEvents: "auto",
    cursor: "default"
  }}
/>

{/* ⋯ Menu icon */}
<div
  className="fixed z-50"
  style={{
    top: "270px",
    left: "0px",
    width: "70px",
    height: "70px",
    background: "transparent",
    pointerEvents: "auto",
    cursor: "default"
  }}
/>



{/* Entire left toolbar */}
<div
  className="fixed z-50"
  style={{
    top: "190px",
    left: "0px",
    width: "100px",
    height: "700px",
    background: "transparent",
    pointerEvents: "auto",
    cursor: "default"
  }}
/>
        <div className="relative overflow-hidden bg-white">
          <iframe
            src={`https://archive.org/embed/${id}?ui=embed`}
            className="h-[85vh] w-full border-0 md:h-[calc(100vh-130px)]"
          />
          {/* Disable search icon and menu button */}
          {/* Home logo over search icon */}
{/* Title bar */}
<div
  className="absolute z-[9999]"
  style={{
    top: "0px",
    left: "20%",
    width: "60%",
    height: "55px",
    background: "rgba(0,0,0,0.001)",
    pointerEvents: "all"
  }}
/>

          {/* Disable title click */}


{/* Disable left toolbar click */}
<div
  className="absolute z-50"
  style={{
    top: "45px",
    left: 0,
    width: "140px",
    height: "100%",
    background: "transparent",
    pointerEvents: "auto",
    cursor: "default"
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