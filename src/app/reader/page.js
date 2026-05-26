"use client";

import { useSearchParams } from "next/navigation";

export default function ReaderPage() {

  const searchParams =
    useSearchParams();

  const file =
    searchParams.get("file");

  return (

    <div className="w-full h-screen bg-black">

      <iframe
        src={`https://archive.org/embed/${file}`}
        className="w-full h-full"
      />

    </div>
  );
}