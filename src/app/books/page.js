"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import BookCard from "../../components/BookCard";

export default function BooksPage() {

  const [books, setBooks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 50;

  // FETCH BOOKS

  useEffect(() => {

    async function fetchBooks() {

      try {

        const res =
          await fetch(
            "/api/library"
          );

        const data =
          await res.json();

        if (data.success) {

          setBooks(data.books);
        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    }

    fetchBooks();

  }, []);

  // DELETE BOOK

  async function handleDelete(id) {

    const confirmDelete =
      confirm(
        "Delete this book?"
      );

    if (!confirmDelete)
      return;

    try {

      await fetch(
        `/api/admin/delete/${id}`,

        {
          method: "DELETE",
        }
      );

      setBooks((prev) =>
        prev.filter(
          (book) =>
            book._id !== id
        )
      );

    } catch (err) {

      console.log(err);
    }
  }

  // FILTER

  const filtered = useMemo(() => {

    return books.filter((book) => {

      return (

        book.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        book.creator
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    });

  }, [books, search]);

  // PAGINATION

  const totalPages =
    Math.ceil(
      filtered.length /
      itemsPerPage
    );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const paginatedBooks =
    filtered.slice(
      startIndex,
      startIndex +
        itemsPerPage
    );

  return (

    <main className="min-h-screen bg-[#f5f5f5]">

      {/* HEADER */}

      <div className="bg-black text-white p-8">

        <h1 className="text-5xl font-bold">

          Books Library

        </h1>

        <p className="mt-3 text-gray-300">

          Dynamic Digital Library

        </p>

      </div>

      {/* SEARCH */}

      <div className="p-6">

        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => {

            setSearch(
              e.target.value
            );

            setCurrentPage(1);
          }}
          className="w-full p-4 rounded-2xl border text-lg"
        />

      </div>

      {/* TOTAL */}

      <div className="px-6 mb-5 flex justify-between items-center">

        <h2 className="text-2xl font-bold">

          Total Books:
          {" "}
          {filtered.length}

        </h2>

        <div className="font-semibold text-lg">

          Page {currentPage}
          {" "}
          of
          {" "}
          {totalPages || 1}

        </div>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="text-center text-2xl py-20">

          Loading books...

        </div>

      ) : (

        <>
          {/* GRID */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6 pb-10">

            {paginatedBooks.map(
              (book) => (

                <BookCard
  key={book._id || book.identifier}
  id={book._id}
  title={book.title}
  creator={book.creator}
  identifier={book.identifier}
  coverImage={book.coverImage}
  pdfUrl={book.pdfUrl}
  source={book.source}
/>
              )
            )}

          </div>

          {/* PAGINATION */}

          <div className="flex justify-center items-center gap-4 pb-12">

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    prev - 1
                )
              }
              className="bg-black text-white px-5 py-2 rounded-lg disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    prev + 1
                )
              }
              className="bg-black text-white px-5 py-2 rounded-lg disabled:opacity-40"
            >
              Next
            </button>

          </div>
        </>
      )}

    </main>
  );
}