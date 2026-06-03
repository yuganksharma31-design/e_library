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
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black">

      {/* HEADER */}
      <header className="z-[100] border-b border-zinc-800 bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link href="/">
            <div className="flex cursor-pointer items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-amber-500" />

              <h1 className="text-2xl font-bold tracking-wide text-white">
                SMT Library
              </h1>
            </div>
          </Link>

          <nav className="flex items-center gap-8 text-sm font-medium text-white">

            <Link
              href="/"
              className="transition hover:text-amber-400"
            >
              Home
            </Link>

            <Link
              href="/manuscripts"
              className="transition hover:text-amber-400"
            >
              Manuscripts
            </Link>

            <Link
              href="/books"
              className="transition hover:text-amber-400"
            >
              Books
            </Link>

            <button
              onClick={downloadBook}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-500"
            >
              Download
            </button>

          </nav>
        </div>
      </header>

      {/* VIEWER */}
      <div className="relative flex-1 overflow-hidden">

        <iframe
          src={`https://archive.org/stream/${id}?ui=embed#mode/2up`}
          className="h-full w-full border-0"
          allowFullScreen
        />

        {/* BLOCK CLICK ON ARCHIVE TITLE */}
        <div
          className="absolute left-0 right-0 top-0 z-50"
          style={{
            height: "60px",
            cursor: "default",
          }}
        />

      </div>

    </div>
  );
}