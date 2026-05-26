"use client";

import dynamic from "next/dynamic";

import {
  Suspense,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

// LOAD ONLY ON CLIENT

const PDFViewer =
  dynamic(
    () =>
      import(
        "../../components/PDFViewer"
      ),
    {
      ssr: false,
    }
  );

function ReaderContent() {

  const searchParams =
    useSearchParams();

  const file =
    searchParams.get("file");

  return (
    <PDFViewer file={file} />
  );
}

export default function ReaderPage() {

  return (

    <Suspense
      fallback={
        <div>

          Loading...

        </div>
      }
    >

      <ReaderContent />

    </Suspense>
  );
}