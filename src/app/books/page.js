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

    <main
      className="
        min-h-screen
        bg-gradient-to-b
        from-black
        to-[#111]
        text-white
      "
    >

      {/* HERO */}

      <div
        className="
          border-b
          border-gray-800
          bg-black/90
          backdrop-blur-xl
        "
      >

        <div
          className="
            max-w-[1700px]
            mx-auto
            px-6
            py-12
          "
        >

          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              tracking-tight
            "
          >
            Digital Library
          </h1>

          <p
            className="
              mt-4
              text-lg
              md:text-2xl
              text-gray-400
              max-w-3xl
            "
          >
            Explore ancient manuscripts,
            rare books, Sanskrit texts,
            archives, and digital collections.
          </p>

        </div>

      </div>

      {/* SEARCH BAR */}

      <div
        className="
          sticky
          top-0
          z-40
          bg-black/90
          backdrop-blur-xl
          border-b
          border-gray-800
        "
      >

        <div
          className="
            max-w-[1700px]
            mx-auto
            px-6
            py-5
          "
        >

          <input
            type="text"
            placeholder="Search books, creators, manuscripts..."
            value={search}
            onChange={(e) => {

              setSearch(
                e.target.value
              );

              setCurrentPage(1);
            }}
            className="
              w-full
              p-5
              rounded-2xl
              bg-[#111]
              border
              border-gray-700
              text-lg
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/30
              transition-all
            "
          />

        </div>

      </div>

      {/* STATS */}

      <div
        className="
          max-w-[1700px]
          mx-auto
          px-6
          py-6
          flex
          flex-col
          md:flex-row
          justify-between
          items-start
          md:items-center
          gap-4
        "
      >

        <div>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            {filtered.length}
            {" "}
            Books Found
          </h2>

          <p
            className="
              text-gray-400
              mt-1
            "
          >
            Browse the digital archive
          </p>

        </div>

        <div
          className="
            bg-[#111]
            border
            border-gray-800
            px-5
            py-3
            rounded-xl
            text-lg
            font-semibold
          "
        >
          Page {currentPage}
          {" "}
          of
          {" "}
          {totalPages || 1}
        </div>

      </div>

      {/* LOADING */}

      {loading ? (

        <div
          className="
            flex
            justify-center
            items-center
            py-32
          "
        >

          <div
            className="
              text-2xl
              text-gray-400
              animate-pulse
            "
          >
            Loading Digital Library...
          </div>

        </div>

      ) : (

        <>
          {/* GRID */}

          <div
            className="
              max-w-[1700px]
              mx-auto
              px-6
              pb-16
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-8
            "
          >

            {paginatedBooks.map(
              (book) => (

                <div
                  key={
                    book._id ||
                    book.identifier
                  }
                  className="
                    transform
                    hover:scale-[1.02]
                    transition-all
                    duration-300
                  "
                >

                  <BookCard
                    _id={book._id}

                    title={book.title}

                    creator={book.creator}

                    identifier={
                      book.identifier
                    }

                    coverImage={
                      book.coverImage
                    }

                    pdfUrl={
                      book.pdfUrl
                    }

                    source={
                      book.source
                    }
                  />

                </div>
              )
            )}

          </div>

          {/* EMPTY */}

          {paginatedBooks.length === 0 && (

            <div
              className="
                text-center
                py-32
              "
            >

              <h3
                className="
                  text-4xl
                  font-bold
                  mb-4
                "
              >
                No Books Found
              </h3>

              <p
                className="
                  text-gray-400
                  text-lg
                "
              >
                Try another search keyword
              </p>

            </div>
          )}

          {/* PAGINATION */}

          <div
            className="
              flex
              justify-center
              items-center
              gap-5
              pb-20
            "
          >

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
              className="
                px-8
                py-4
                rounded-2xl
                bg-[#111827]
                hover:bg-[#1f2937]
                transition-all
                disabled:opacity-40
                text-lg
                font-semibold
              "
            >
              ← Previous
            </button>

            <div
              className="
                text-xl
                font-bold
              "
            >
              {currentPage}
            </div>

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
              className="
                px-8
                py-4
                rounded-2xl
                bg-blue-600
                hover:bg-blue-700
                transition-all
                disabled:opacity-40
                text-lg
                font-semibold
              "
            >
              Next →
            </button>

          </div>
        </>
      )}

    </main>
  );
}