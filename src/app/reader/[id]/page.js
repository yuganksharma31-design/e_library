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

<div className="flex flex-wrap items-center justify-between gap-5 px-8 py-5 bg-white border-b">

  <h1
    className="
    text-xl
    md:text-2xl
    font-bold
    text-stone-900
    line-clamp-2
    "
  >
    {decodeURIComponent(id)}
  </h1>

  <div className="flex flex-wrap gap-3">

    <button
      onClick={downloadBook}
      className="
      rounded-full
      bg-[#98003A]
      px-6
      py-3
      font-semibold
      text-white
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

    const exists = favorites.some(
      (book) => book.id === id
    );

    if (!exists) {

      favorites.push({
        id,
        title: decodeURIComponent(id),
        cover: `https://archive.org/services/img/${id}`
      });

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      alert("Added to Bookmarks");

    } else {

      alert("Already in Bookmarks");

    }

  }}
  className="
  rounded-full
  bg-yellow-400
  px-6
  py-3
  font-semibold
  shadow-xl
  "
>
  Bookmark
</button>

  </div>

</div>
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

 {/* Hide search and three-dot buttons */}
<div
  className="absolute z-50"
  style={{
    left: 0,
    top: 42,
    width: 70,
    height: 110,
    background: "transparent"
  }}
/>
      {/* HIDE LEFT TOOLBAR */}
     

    

    {/* CUSTOM BUTTONS */}
   
  </div>
</div> {/* closes bg-white overflow-auto */}

</div> {/* closes w-full flex-1 */}

{/* FOOTER */}
<footer className="mt-0 bg-[#98003A] text-white">

    <div className="mx-auto max-w-7xl px-8 py-10">

      <div className="mx-auto max-w-7xl px-8 py-20">

  <h3 className="text-4xl font-bold text-white">
    Seth Shree Surajmal Tapariya E-Granthalay
  </h3>

  <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-200">
    A Digital Repository of Sanskrit Manuscripts,
    Rare Books and Historical Collections.
  </p>

  <div className="mt-12 text-sm text-stone-300">
    © 2026 SMTASM • Preserving Knowledge For Future Generations
  </div>

</div>

    </div>

  </footer>

 

</div>

);
}