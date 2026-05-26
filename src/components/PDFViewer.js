"use client";

import {
  Document,
  Page,
  pdfjs
} from "react-pdf";

import {
  useState
} from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";

import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({
  file,
}) {

  const [numPages, setNumPages] =
    useState(null);

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

      {/* TOP BAR */}

      <div className="sticky top-0 z-50 bg-[#111] p-4 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">

            Digital Reader

          </h1>

          <p className="text-gray-400">

            Page {pageNumber}
            {" "}of{" "}
            {numPages || 0}

          </p>

        </div>

        <div className="flex gap-3 items-center">

          <button
            onClick={() =>
              setPageNumber((p) =>
                Math.max(p - 1, 1)
              )
            }
            className="bg-gray-700 px-4 py-2 rounded"
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
            className="bg-gray-700 px-4 py-2 rounded"
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
            className="bg-gray-700 px-4 py-2 rounded"
          >
            -
          </button>

          <span>

            {Math.round(
              scale * 100
            )}%

          </span>

          <button
            onClick={() =>
              setScale((s) =>
                Math.min(
                  s + 0.2,
                  3
                )
              )
            }
            className="bg-gray-700 px-4 py-2 rounded"
          >
            +
          </button>

          <a
            href={file}
            target="_blank"
            className="bg-red-600 px-5 py-2 rounded"
          >
            Download
          </a>

        </div>

      </div>

      {/* PDF */}

      <div className="flex justify-center p-5">

        <Document
          file={file}
          onLoadSuccess={
            onDocumentLoadSuccess
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