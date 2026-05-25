"use client";

import { useState } from "react";

import books from "../../data/books.json";

import BookCard from "../../components/BookCard";

export default function BooksPage() {

  const [search, setSearch] = useState("");

  const filtered = books.filter((book) => {

    return (

      book.title?.toLowerCase().includes(
        search.toLowerCase()
      ) ||

      book.creator?.toLowerCase().includes(
        search.toLowerCase()
      )
    );
  });

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
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-4 rounded-2xl border text-lg"
        />

      </div>

      {/* TOTAL */}

      <div className="px-6 mb-5">

        <h2 className="text-2xl font-bold">

          Total Books: {filtered.length}

        </h2>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6 pb-10">

        {filtered.map((book, index) => (

          <BookCard
            key={index}
            title={book.title}
            identifier={book.identifier}
            creator={book.creator}
          />

        ))}

      </div>

    </main>
  );
}