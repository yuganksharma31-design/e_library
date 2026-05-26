"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ReaderContent() {

  const searchParams = useSearchParams();

  const file =
    searchParams.get("file");

  if (!file) {

    return (
      <div className="text-white p-10">
        No PDF found
      </div>
    );
  }

  // PDF.js Viewer

  const viewerUrl =
    `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(
      window.location.origin + file
    )}`;

  return (

    <div className="w-full h-screen bg-black">

      {/* HEADER */}

      <div className="bg-black text-white p-5 flex justify-between items-center">

        <h1 className="text-4xl font-bold">

          Digital Reader

        </h1>

        <a
          href={file}
          target="_blank"
          className="bg-red-600 px-8 py-4 rounded-2xl text-2xl font-bold"
        >
          Download
        </a>

      </div>

      {/* PROFESSIONAL PDF VIEWER */}

      <iframe
        src={viewerUrl}
        className="w-full h-[calc(100vh-100px)]"
      />

    </div>
  );
}

export default function ReaderPage() {

  return (

    <Suspense fallback={<div>Loading...</div>}>

      <ReaderContent />

    </Suspense>
  );
}