"use client";

import {
  useSearchParams,
} from "next/navigation";

import {
  useState,
  useEffect,
  Suspense,
} from "react";

import {
  Document,
  Page,
  pdfjs,
} from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";

import "react-pdf/dist/Page/TextLayer.css";

// PDF WORKER

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ReaderContent() {

  const searchParams =
    useSearchParams();

  const file =
    searchParams.get("file");

  const [numPages, setNumPages] =
    useState(0);

  const [pageNumber, setPageNumber] =
    useState(1);

  const [scale, setScale] =
    useState(1.2);

  function onDocumentLoadSuccess({
    numPages,
  }) {

    setNumPages(numPages);
  }

  return (

    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}

      <div className="flex justify-between items-center p-5 bg-[#111]">

        <div>

          <h1 className="text-5xl font-bold">

            Digital Reader

          </h1>

          <p className="text-2xl mt-2">

            Page {pageNumber}
            {" "}
            of
            {" "}
            {numPages}

          </p>

        </div>

        {/* CONTROLS */}

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setPageNumber((p) =>
                Math.max(p - 1, 1)
              )
            }
            className="bg-slate-700 px-6 py-4 rounded-xl text-2xl"
          >
            ←
          </button>

          <button
            onClick={() =>
              setPageNumber((p) =>
                Math.min(
                  p + 1,
                  numPages
                )
              )
            }
            className="bg-slate-700 px-6 py-4 rounded-xl text-2xl"
          >
            →
          </button>

          <button
            onClick={() =>
              setScale((s) =>
                Math.max(
                  s - 0.2,
                  0.6
                )
              )
            }
            className="bg-slate-700 px-6 py-4 rounded-xl text-2xl"
          >
            -
          </button>

          <span className="text-2xl">

            {Math.round(scale * 100)}%

          </span>

          <button
            onClick={() =>
              setScale((s) =>
                s + 0.2
              )
            }
            className="bg-slate-700 px-6 py-4 rounded-xl text-2xl"
          >
            +
          </button>

          <a
            href={file}
            target="_blank"
            className="bg-red-600 px-6 py-4 rounded-xl text-2xl"
          >
            Download
          </a>

        </div>

      </div>

      {/* PDF */}

      <div className="flex justify-center py-10 overflow-auto">

        <Document
          file={file}
          onLoadSuccess={
            onDocumentLoadSuccess
          }
          loading={
            <p className="text-3xl">

              Loading PDF...

            </p>
          }
          error={
            <p className="text-3xl text-red-500">

              Failed to load PDF file.

            </p>
          }
        >

          <Page
            pageNumber={pageNumber}
            scale={scale}
          />

        </Document>

      </div>

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