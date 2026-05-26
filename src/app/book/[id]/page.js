"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookPage() {

  const params = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {

    async function fetchBook() {

      try {

        const res = await fetch("/api/books");

        const data = await res.json();

        const foundBook = data.books.find(
          (b) => b._id === params.id
        );

        setBook(foundBook);

      } catch (err) {

        console.log(err);
      }
    }

    fetchBook();

  }, [params.id]);

  if (!book) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">

        Loading...

      </div>
    );
  }

  return (

    <div className="bg-black min-h-screen">

      {/* TOP BAR */}

      <div className="sticky top-0 z-50 bg-black border-b border-gray-800 px-5 py-4 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Digital Manuscript Reader
          </h1>

          <p className="text-gray-400 mt-1">
            {book.title}
          </p>

        </div>

        <a
          href={book.pdfUrl}
          target="_blank"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold"
        >
          Download
        </a>

      </div>

      {/* PDF */}

      <div className="w-full h-[90vh]">

        <iframe
          src={book.pdfUrl}
          className="w-full h-full"
        />

      </div>

    </div>
  );
}