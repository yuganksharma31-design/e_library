"use client";

import {
  Suspense
} from "react";

import {
  useSearchParams
} from "next/navigation";

function ReaderContent() {

  const searchParams =
    useSearchParams();

  const file =
    searchParams.get("file");

  if (!file) {

    return (

      <div className="p-10 text-2xl">

        No PDF Found

      </div>
    );
  }

  return (

    <main className="w-full h-screen bg-black">

      <iframe
        src={file}
        className="w-full h-full"
      />

    </main>
  );
}

export default function ReaderPage() {

  return (

    <Suspense
      fallback={

        <div className="p-10 text-2xl">

          Loading PDF...

        </div>
      }
    >

      <ReaderContent />

    </Suspense>
  );
}