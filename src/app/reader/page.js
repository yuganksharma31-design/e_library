"use client";

import { useSearchParams }
from "next/navigation";

export default function ReaderPage() {

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