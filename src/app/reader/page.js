"use client";

import {
  useSearchParams,
} from "next/navigation";

import {
  Suspense,
} from "react";

function ReaderContent() {

  const searchParams =
    useSearchParams();

  const file =
    searchParams.get("file");

  // GOOGLE VIEWER

  const viewerUrl =
    `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(file)}`;

  return (

    <main className="min-h-screen bg-black">

      {/* HEADER */}

      <div className="flex justify-between items-center bg-[#111] text-white p-5">

        <h1 className="text-5xl font-bold">

          Digital Reader

        </h1>

        <a
          href={file}
          target="_blank"
          className="bg-red-600 px-6 py-4 rounded-xl text-2xl"
        >
          Download
        </a>

      </div>

      {/* VIEWER */}

      <iframe
        src={viewerUrl}
        className="w-full h-[90vh]"
      />

    </main>
  );
}

export default function ReaderPage() {

  return (

    <Suspense fallback={<div>Loading...</div>}>

      <ReaderContent />

    </Suspense>
  );
}