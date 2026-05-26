"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookPage() {
  const params = useParams();

  const [book, setBook] =
    useState(null);

  const [page, setPage] =
    useState(1);

  const [zoom, setZoom] =
    useState(60);

  const [darkMode, setDarkMode] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        // DIRECT ARCHIVE API

        const res = await fetch(
          `https://archive.org/metadata/${params.id}`
        );

        const data =
          await res.json();

        console.log(data);

        setBook(data);
      } catch (err) {
        console.log(err);
      }
    }

    if (params?.id) {
      fetchBook();
    }
  }, [params?.id]);

  if (!book) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#000",
          color: "#fff",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          fontSize: "40px",
        }}
      >
        Loading...
      </div>
    );
  }

  // IMPORTANT FIX

  const identifier =
    book.metadata?.identifier;

  const totalPages =
    Number(
      book.metadata?.imagecount
    ) || 500;

  // CORRECT IMAGE URL

  const imageUrl =
    `https://archive.org/download/${identifier}/page/n${page}.jpg`;

  console.log(imageUrl);

  return (
    <div
      style={{
        background: darkMode
          ? "#000"
          : "#f3f3f3",

        minHeight: "100vh",

        color: darkMode
          ? "#fff"
          : "#000",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          padding: "25px",

          borderBottom:
            "1px solid #222",

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          flexWrap: "wrap",

          gap: "20px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "70px",

              marginBottom: "10px",

              fontWeight: "300",
            }}
          >
            Digital Manuscript
            Reader
          </h1>

          <p
            style={{
              fontSize: "28px",

              opacity: 0.7,
            }}
          >
            Page {page} of{" "}
            {totalPages}
          </p>
        </div>

        {/* CONTROLS */}

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
                Math.max(prev - 1, 1)
              )
            }
            style={btn}
          >
            ←
          </button>

          <button
            onClick={() =>
              setPage((prev) =>
                Math.min(
                  prev + 1,
                  totalPages
                )
              )
            }
            style={btn}
          >
            →
          </button>

          <button
            onClick={() =>
              setZoom((prev) =>
                Math.max(prev - 10, 30)
              )
            }
            style={btn}
          >
            -
          </button>

          <h2>{zoom}%</h2>

          <button
            onClick={() =>
              setZoom(
                (prev) => prev + 10
              )
            }
            style={btn}
          >
            +
          </button>

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            style={{
              ...btn,

              background:
                darkMode
                  ? "#2563eb"
                  : "#111",
            }}
          >
            {darkMode
              ? "Light"
              : "Dark"}
          </button>

          <a
            href={`https://archive.org/download/${identifier}/${identifier}.pdf`}
            target="_blank"
          >
            <button
              style={{
                background: "red",

                color: "#fff",

                border: "none",

                padding:
                  "18px 26px",

                borderRadius:
                  "12px",

                fontSize: "22px",

                cursor: "pointer",

                fontWeight: "bold",
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

          justifyContent:
            "center",

          padding: "40px",
        }}
      >
        <div>
          {loading && (
            <div
              style={{
                color: "#aaa",

                textAlign: "center",

                marginBottom: "20px",

                fontSize: "30px",
              }}
            >
              Loading Manuscript...
            </div>
          )}

          <img
            key={imageUrl}
            src={imageUrl}
            alt="manuscript"
            style={{
              width: `${zoom}%`,

              borderRadius:
                "10px",

              boxShadow:
                "0px 0px 25px rgba(255,255,255,0.1)",
            }}
            onLoad={() => {
              setLoading(false);
            }}
            onError={(e) => {
              console.log(
                "FAILED:",
                imageUrl
              );

              setLoading(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

const btn = {
  background: "#111827",

  color: "#fff",

  border: "none",

  padding: "16px 22px",

  borderRadius: "12px",

  fontSize: "24px",

  cursor: "pointer",
};