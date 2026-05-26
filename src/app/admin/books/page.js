"use client";

import {
  useEffect,
  useState,
} from "react";

export default function AdminBooksPage() {

  const [books, setBooks] =
    useState([]);

  useEffect(() => {

    async function loadBooks() {

      const res =
        await fetch("/api/library");

      const data =
        await res.json();

      if (data.success) {

        setBooks(data.books);
      }
    }

    loadBooks();

  }, []);

  async function deleteBook(id) {

    const confirmDelete =
      confirm(
        "Delete this book?"
      );

    if (!confirmDelete)
      return;

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
  }

  return (

    <main className="min-h-screen p-10 bg-[#f5f5f5]">

      <h1 className="text-5xl font-bold mb-10">

        Admin Books

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {books.map((book) => (

          <div
            key={book._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-[320px] object-cover"
            />

            <div className="p-4">

              <h2 className="text-2xl font-bold">

                {book.title}

              </h2>

              <p className="text-gray-600 mt-2">

                {book.creator}

              </p>

              <div className="flex gap-3 mt-5">

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">

                  Edit

                </button>

                <button
                  onClick={() =>
                    deleteBook(book._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >

                  Delete

                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}