"use client";

import { useSearchParams } from "next/navigation";

import {
  Worker,
  Viewer,
} from "@react-pdf-viewer/core";

import {
  defaultLayoutPlugin,
} from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function ReaderPage() {

  const searchParams =
    useSearchParams();

  const file =
    searchParams.get("file");

  const defaultLayoutPluginInstance =
    defaultLayoutPlugin();

  return (

    <div className="h-screen bg-black">

      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >

        <Viewer
          fileUrl={file}
          plugins={[
            defaultLayoutPluginInstance,
          ]}
        />

      </Worker>

    </div>
  );
}s