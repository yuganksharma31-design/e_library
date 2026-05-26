"use client";

import {
  Suspense,
  useState
} from "react";

import {
  useSearchParams
} from "next/navigation";

function ReaderContent() {

  const searchParams =
    useSearchParams();

  const file =
    searchParams.get("file");

  const [zoom, setZoom] =
    useState(100);

  if (!file) {

    return (

      <div className="p-10 text-2xl">

        No PDF Found

      </div>
    );
  }

  return (

    <main className="w-full h-screen bg-black flex flex-col">

      {/* TOPBAR */}

      <div className="bg-[#111] text-white p-4 flex items-center justify-between">

        <h1 className="text-xl font-bold">

          Digital Reader

        </h1>

        <div className="flex items-center gap-3">

          <button
            onClick={() =>
              setZoom(
                (prev) =>
                  Math.max(
                    prev - 10,
                    50
                  )
              )
            }
            className="bg-gray-700 px-4 py-2 rounded"
          >
            -
          </button>

          <span>

            {zoom}%
          </span>

          <button
            onClick={() =>
              setZoom(
                (prev) =>
                  Math.min(
                    prev + 10,
                    200
                  )
              )
            }
            className="bg-gray-700 px-4 py-2 rounded"
          >
            +
          </button>

        </div>

      </div>

      {/* PDF */}

      <iframe
        src={`${file}#toolbar=0`}
        className="w-full flex-1"
        style={{
          zoom:
            `${zoom}%`,
        }}
      />

    </main>
  );
}

export default function ReaderPage() {

  return (

    <Suspense
      fallback={

        <div className="p-10 text-2xl">

          Loading Reader...

        </div>
      }
    >

      <ReaderContent />

    </Suspense>
  );
}