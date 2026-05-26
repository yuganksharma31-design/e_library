"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import HTMLFlipBook from "react-pageflip";

import {
  Document,
  Page,
  pdfjs,
} from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ReaderContent() {

  const searchParams =
    useSearchParams();

  const file =
    searchParams.get("file");

  const [numPages, setNumPages] =
    useState(0);

  function onDocumentLoadSuccess({
    numPages,
  }) {

    setNumPages(numPages);
  }

  if (!file) {

    return (
      <div className="text-white p-10">
        No PDF Found
      </div>
    );
  }

  return (

    <div className="bg-black min-h-screen">

      {/* HEADER */}

      <div className="bg-black text-white p-5 flex justify-between items-center">

        <h1 className="text-5xl font-bold">

          Digital Reader

        </h1>

        <a
          href={file}
          target="_blank"
          className="bg-red-600 px-8 py-4 rounded-2xl text-2xl font-bold"
        >
          Download
        </a>

      </div>

      {/* BOOK VIEWER */}

      <div className="flex justify-center py-10">

        <Document
          file={file}
          onLoadSuccess={
            onDocumentLoadSuccess
          }
        >

          <HTMLFlipBook
            width={500}
            height={700}
            showCover={true}
          >

            {Array.from(
              new Array(numPages),
              (_, index) => (

                <div
                  key={index}
                  className="bg-white"
                >

                  <Page
                    pageNumber={
                      index + 1
                    }
                    width={500}
                  />

                </div>
              )
            )}

          </HTMLFlipBook>

        </Document>

      </div>

    </div>
  );
}

export default function ReaderPage() {

  return (

    <Suspense fallback={<div>Loading...</div>}>

      <ReaderContent />

    </Suspense>
  );
}