"use client";

import dynamic from "next/dynamic";

const ReaderClient = dynamic(
  () => import("./ReaderClient"),
  {
    ssr: false,
  }
);

export default function ReaderPage() {

  return <ReaderClient />;
}