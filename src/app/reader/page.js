"use client";

import { useSearchParams } from "next/navigation";

export default function ReaderPage() {

  const searchParams = useSearchParams();

  const file =
    searchParams.get("file");

  return (

    <div className="w-full h-screen bg-black">

      {/* HEADER */}

      <div className="flex items-center justify-between p-4 bg-black text-white">

        <h1 className="text-4xl font-bold">

          Digital Reader

        </h1>

        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 px-8 py-4 rounded-xl text-2xl font-bold"
        >
          Download
        </a>

      </div>

      {/* PDF VIEWER */}

      <iframe
        src={file}
        className="w-full h-[90vh] bg-white"
      />

    </div>
  );
}