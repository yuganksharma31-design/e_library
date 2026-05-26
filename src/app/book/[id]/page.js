"use client";

import manuscripts from "../../../data/manuscripts.json";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function BookPage() {

  const params = useParams();

  const [book, setBook] = useState(null);

  const [page, setPage] = useState(0);

  const [zoom, setZoom] = useState(60);

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {

    if (!params?.id) return;

    const foundBook = manuscripts.find(
      (item) => item.identifier === params.id
    );

    setBook(foundBook);

  }, [params]);

  if (!book) {

    return (
      <div
        style={{
          background: "black",
          color: "white",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
        }}
      >
        Loading...
      </div>
    );
  }

  const images = book.images || [];

  const currentImage = images[page];

  return (
    <div
      style={{
        background: darkMode ? "#000" : "#f5f5f5",
        minHeight: "100vh",
        color: darkMode ? "white" : "black",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #333",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#0b0b0b",
          position: "sticky",
          top: 0,
          zIndex: 999,
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "52px",
              margin: 0,
            }}
          >
            Digital Manuscript Reader
          </h1>

          <p
            style={{
              fontSize: "30px",
              color: "#bbb",
            }}
          >
            Page {page + 1} of {images.length}
          </p>

        </div>

        <div
          style={{
            display: "flex",
            gap: "14px",
            alignItems: "center",
          }}
        >

          <button
            onClick={() =>
              setPage((prev) =>
                Math.max(prev - 1, 0)
              )
            }
          >
            ←
          </button>

          <button
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, images.length - 1)
              )
            }
          >
            →
          </button>

          <button
            onClick={() =>
              setZoom((prev) => prev - 10)
            }
          >
            -
          </button>

          <span
            style={{
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            {zoom}%
          </span>

          <button
            onClick={() =>
              setZoom((prev) => prev + 10)
            }
          >
            +
          </button>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          <a
            href={book.download}
            target="_blank"
          >
            <button
              style={{
                background: "red",
                color: "white",
              }}
            >
              Download
            </button>
          </a>

        </div>

      </div>

      {/* IMAGE */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "30px",
        }}
      >

        <img
          src={currentImage}
          alt="manuscript"
          style={{
            width: `${zoom}%`,
            height: "auto",
            borderRadius: "10px",
            boxShadow:
              "0 0 30px rgba(0,0,0,0.6)",
          }}
        />

      </div>

    </div>
  );
}