"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ReaderContent() {

  const searchParams =
    useSearchParams();

  const file =
    searchParams.get("file");

  if (!file) {

    return (

      <div className="text-white p-10">

        PDF not found

      </div>
    );
  }

  return (

    <div className="w-full h-screen bg-black">

      {/* HEADER */}

      <div className="flex items-center justify-between px-6 py-5 bg-black">

        <h1 className="text-5xl font-bold text-white">

          Digital Reader

        </h1>

        <a
          href={file}
          target="_blank"
          className="bg-red-600 text-white px-10 py-5 rounded-2xl text-3xl font-bold"
        >
          Download
        </a>

      </div>

      {/* PDF VIEWER */}

      <iframe
        src={file}
        className="w-full h-[calc(100vh-110px)] bg-white"
      />

    </div>
  );
}

export default function ReaderPage() {

  return (

    <Suspense>

      <ReaderContent />

    </Suspense>
  );
}