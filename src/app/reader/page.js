"use client";

import dynamic
from "next/dynamic";

import {
  Suspense
} from "react";

import {
  useSearchParams
} from "next/navigation";

// DISABLE SSR

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

  if (!file) {

    return (

      <div className="p-10">

        No PDF Found

      </div>
    );
  }

  return (
    <PDFViewer file={file} />
  );
}

export default function ReaderPage() {

  return (

    <Suspense
      fallback={

        <div className="p-10">

          Loading...

        </div>
      }
    >

      <ReaderContent />

    </Suspense>
  );
}