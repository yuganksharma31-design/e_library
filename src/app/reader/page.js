"use client";

import { Suspense } from "react";

import {
  useSearchParams,
} from "next/navigation";

function ReaderContent() {

  const searchParams =
    useSearchParams();

  const file =
    searchParams.get("file");

  return (

    <div className="w-full h-screen bg-black">

      {/* HEADER */}

      <div className="flex justify-between items-center bg-[#111] text-white p-5">

        <h1 className="text-5xl font-bold">

          Digital Reader

        </h1>

        <a
          href={file}
          target="_blank"
          className="bg-red-600 px-8 py-4 rounded-2xl text-3xl font-bold"
        >
          Download
        </a>

      </div>

      {/* PDF VIEWER */}

      <iframe
        src={`${file}#toolbar=1&navpanes=1&scrollbar=1`}
        className="w-full h-[calc(100vh-110px)]"
      />

    </div>
  );
}

export default function ReaderPage() {

  return (

    <Suspense fallback={

      <div className="text-white text-3xl p-10">

        Loading Reader...

      </div>
    }>

      <ReaderContent />

    </Suspense>
  );
}