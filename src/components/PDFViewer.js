"use client";

import {
  useState,
} from "react";

import dynamic from "next/dynamic";

// IMPORT REACT PDF ONLY CLIENT SIDE

const Document =
  dynamic(
    async () => {

      const mod =
        await import(
          "react-pdf"
        );

      return mod.Document;
    },
    {
      ssr: false,
    }
  );

const Page =
  dynamic(
    async () => {

      const mod =
        await import(
          "react-pdf"
        );

      return mod.Page;
    },
    {
      ssr: false,
    }
  );

export default function PDFViewer({
  file,
}) {

  const [numPages, setNumPages] =
    useState(0);

  const [pageNumber, setPageNumber] =
    useState(1);

  const [scale, setScale] =
    useState(1.2);

  function onLoadSuccess({
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
            onLoadSuccess
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