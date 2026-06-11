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
  
  
{/* VIEWER CONTAINER */}
<div className="w-full flex-1">

  <div
className="
w-full
bg-white
overflow-auto
"
>


    {/* VIEWER */}
    <div className="relative">

      <iframe
src={`https://archive.org/embed/${id}`}
className="
w-full
border-0
h-[85vh]
md:h-[calc(100vh-130px)]
"
/>
      {/* HIDE ARCHIVE TITLE */}
     <div
  className="absolute top-0 left-0 right-0 z-50"
  style={{
    height: "50px",
    pointerEvents: "all",
    cursor: "default"
  }}
></div>

      {/* HIDE LEFT TOOLBAR */}
     

    </div>

    {/* CUSTOM BUTTONS */}
   
  </div>
<div className="fixed bottom-5 right-5 z-50 flex gap-3">

  <button
    onClick={downloadBook}
    className="
      rounded-full
      bg-[#98003A]
      px-6
      py-3
      text-white
      font-semibold
      shadow-xl
    "
  >
    📥 Download
  </button>
<button
onClick={() => {

const favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];

favorites.push({
id,
title: id,
cover: `https://archive.org/services/img/${id}`
});

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

alert("Added to favorites ❤️");

}}
className="
rounded-full
bg-yellow-400
px-6
py-3
font-semibold
"
>
❤️ Favorite
</button>
  
</div>
</div>


  {/* FOOTER */}
  <footer className="border-t border-stone-200">

    <div className="mx-auto max-w-7xl px-8 py-10">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h3 className="text-xl md:text-3xl font-bold text-[#98003A]">

            Seth Shree Surajmal Tapariya E-Granthalay

          </h3>

          <p className="mt-4 max-w-2xl text-sm md:text-lg leading-7 text-stone-500">

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