"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function ReaderPage() {
  const { id } = useParams();

  async function downloadBook() {
    try {
      const response = await fetch(
        `https://archive.org/metadata/${id}`
      );

      const meta = await response.json();

      let pdfFile = meta.files?.find(
        (file) =>
          file.name &&
          file.name.toLowerCase().endsWith(".pdf")
      );

      if (!pdfFile) {
        alert("PDF version not available for download.");
        return;
      }

      const downloadUrl =
        `https://archive.org/download/${id}/${encodeURIComponent(
          pdfFile.name
        )}`;

      window.open(downloadUrl, "_blank");
    } catch (error) {
      console.error(error);
      alert("Download failed.");
    }
  }

  if (!id) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F8F5EF] text-stone-900">
      Loading...
    </div>
  );
}

  return (
   
<div className="flex min-h-screen flex-col bg-[#F8F5EF]">

  {/* HEADER */}
  <header className="sticky top-0 z-[100] border-b border-stone-200 bg-[#F8F5EF]/95 backdrop-blur-xl">

    <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

      <div className="flex items-center gap-5">

        <Link
          href="/"
          className="
            rounded-full
            bg-white
            px-5
            py-3
            shadow-lg
            transition
            hover:-translate-y-1
          "
        >
          ← Home
        </Link>

        <div>

          <h1 className="text-xl font-bold text-stone-900">
            Seth Shree Surajmal Tapariya
          </h1>

          <p className="text-sm text-stone-500">
            E-Granthalay
          </p>

        </div>

      </div>

      <div className="flex items-center gap-4">

        <button
          onClick={downloadBook}
          className="
            rounded-full
            bg-[#8B5E34]
            px-6
            py-3
            font-semibold
            text-white
            shadow-lg
            transition
            hover:bg-[#704823]
          "
        >
          Download PDF
        </button>

      </div>

    </div>

  </header>

  {/* VIEWER CONTAINER */}
  <div className="mx-auto flex w-full max-w-7xl flex-1 p-6">

    <div
  className="
    relative
    w-full
    overflow-hidden
    rounded-[40px]
    bg-white
    shadow-2xl
  "
>

  {/* VIEWER */}
  <div
    className="relative"
    style={{
      height: "calc(100vh - 150px)"
    }}
  >

        <iframe
          src={`https://archive.org/stream/${id}?ui=embed#mode/2up`}
          className="h-full w-full border-0"
          allowFullScreen
        />

        {/* BLOCK TOP TITLE CLICK */}
        <div
          className="absolute left-0 right-0 top-0 z-50"
          style={{
            height: "60px",
            cursor: "default"
          }}
        />

      </div>

    </div>

  </div>

  {/* FOOTER */}
  <footer className="border-t border-stone-200">

    <div className="mx-auto max-w-7xl px-8 py-10">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h3 className="text-xl font-bold text-stone-900">

            Seth Shree Surajmal Tapariya E-Granthalay

          </h3>

          <p className="mt-2 text-stone-500">

            Preserving Sanskrit Manuscripts and Rare Books
            for Future Generations.

          </p>

        </div>

        <div className="text-sm text-stone-400">

          © 2026 SMTASM

        </div>

      </div>

    </div>

  </footer>

 

</div>

);
}