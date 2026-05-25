"use client";

import { useMemo, useState } from "react";

import manuscripts from "../../data/manuscripts.json";

import BookCard from "../../components/BookCard";

export default function ManuscriptsPage() {

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  // ITEMS PER PAGE

  const itemsPerPage = 40;

  // FILTERED DATA

  const filtered = useMemo(() => {

    return manuscripts.filter((book) => {

      return (

        book.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        book.creator
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });

  }, [search]);

  // PAGINATION

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const paginatedBooks =
    filtered.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    filtered.length / itemsPerPage
  );

  return (

    <main className="min-h-screen bg-[#f5f5f5]">

      {/* HEADER */}

      <div className="bg-black text-white p-8">

        <h1 className="text-5xl font-bold">

          Manuscripts Library

        </h1>

        <p className="mt-3 text-gray-300">

          Explore rare Sanskrit manuscripts

        </p>

      </div>

      {/* SEARCH */}

      <div className="p-6">

        <input
          type="text"
          placeholder="Search manuscripts..."
          value={search}
          onChange={(e) => {

            setSearch(e.target.value);

            setCurrentPage(1);
          }}
          className="w-full p-4 rounded-2xl border text-lg"
        />

      </div>

      {/* TOTAL */}

      <div className="px-6 mb-5">

        <h2 className="text-2xl font-bold">

          Total Manuscripts: {filtered.length}

        </h2>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6 pb-10">

        {paginatedBooks.map((book, index) => (

          <BookCard
            key={index}
            title={book.title}
            identifier={book.identifier}
            creator={book.creator}
          />

        ))}

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center items-center gap-4 pb-10">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)
          }
          className="bg-black text-white px-5 py-2 rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <div className="text-xl font-semibold">

          Page {currentPage} of {totalPages}

        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => prev + 1)
          }
          className="bg-black text-white px-5 py-2 rounded-lg disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </main>
  );
}