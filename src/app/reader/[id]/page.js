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

          <div className="flex items-center gap-4">

  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#98003A] text-white text-xl font-bold">
    ॐ
  </div>

  <div>

    <h1 className="text-xl font-bold text-[#98003A]">
      Seth Shree Surajmal Tapariya
    </h1>

    <p className="text-sm text-stone-500">
      E-Granthalay
    </p>

  </div>

</div>

        </div>

      </div>

      <div className="flex items-center gap-4">

        <button
          onClick={downloadBook}
         className="
rounded-full
bg-[#98003A]
px-7
py-3
font-semibold
text-white
shadow-xl
transition
duration-300
hover:scale-105
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
      w-full
      overflow-hidden
      rounded-[40px]
      bg-white
      shadow-2xl
      ring-1
      ring-stone-200
    "
  >

    {/* TITLE */}
    <div className="border-b border-stone-200 bg-white px-8 py-5">

      <div className="text-sm font-semibold uppercase tracking-[3px] text-[#98003A]">
        Digital Manuscript Viewer
      </div>

      <h2 className="mt-2 text-2xl font-bold text-stone-900">
        Archive Reader
      </h2>

    </div>

    {/* VIEWER */}
    <div className="relative">

      <iframe
        src={`https://archive.org/stream/${id}?ui=embed#mode/2up`}
        className="h-[80vh] w-full border-0"
        allowFullScreen
      />

      {/* HIDE ARCHIVE TITLE */}
     <div
  className="absolute top-0 left-0 right-0 z-50"
  style={{
    height: "45px",
    background: "transparent",
    pointerEvents: "auto",
    cursor: "default"
  }}
/>

      {/* HIDE LEFT TOOLBAR */}
     

    </div>

    {/* CUSTOM BUTTONS */}
   
  </div>

</div>


  {/* FOOTER */}
  <footer className="border-t border-stone-200">

    <div className="mx-auto max-w-7xl px-8 py-10">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h3 className="text-3xl font-bold text-[#98003A]">

            Seth Shree Surajmal Tapariya E-Granthalay

          </h3>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-500">

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