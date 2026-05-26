"use client";

import { useMemo, useState } from "react";

import books from "../../data/books.json";

import BookCard from "../../components/BookCard";

export default function BooksPage() {

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 50;

  // FILTER

  const filtered = useMemo(() => {

    return books.filter((book) => {

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

  const totalPages = Math.ceil(
    filtered.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedBooks =
    filtered.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  return (

    <main className="min-h-screen bg-[#f5f5f5]">

      {/* HEADER */}

      <div className="bg-black text-white p-8">

        <h1 className="text-5xl font-bold">

          Books Library

        </h1>

        <p className="mt-3 text-gray-300">

          Explore ancient books and archives

        </p>

      </div>

      {/* SEARCH */}

      <div className="p-6">

        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => {

            setSearch(e.target.value);

            setCurrentPage(1);
          }}
          className="w-full p-4 rounded-2xl border text-lg"
        />

      </div>

      {/* TOTAL */}

      <div className="px-6 mb-5 flex justify-between items-center">

        <h2 className="text-2xl font-bold">

          Total Books: {filtered.length}

        </h2>

        <div className="text-lg font-semibold">

          Page {currentPage} of {totalPages}

        </div>

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

      <div className="flex flex-wrap justify-center items-center gap-3 pb-14">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)
          }
          className="bg-black text-white px-5 py-2 rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        {Array.from(
          { length: totalPages },
          (_, i) => i + 1
        )
          .slice(
            Math.max(currentPage - 3, 0),
            currentPage + 2
          )
          .map((page) => (

            <button
              key={page}
              onClick={() =>
                setCurrentPage(page)
              }
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-black text-white"
                  : "bg-white border"
              }`}
            >
              {page}
            </button>

          ))}

        <button
          disabled={
            currentPage === totalPages
          }
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