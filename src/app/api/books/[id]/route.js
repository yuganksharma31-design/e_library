import { NextResponse } from "next/server";

import books from "@/data/books.json";

export async function GET(request, { params }) {
  try {

    const book = books.find(
      (item) => {

        const itemId =
          item._id?.toString() ||
          item.identifier?.toString();

        return itemId === params.id;
      }
    );

    if (!book) {

      return NextResponse.json(
        {
          error: "Book not found",
        },
        {
          status: 404,
        }
      );
    }

    const formattedData = {

      _id:
        book._id ||
        book.identifier,

      identifier:
        book.identifier ||
        book._id,

      title:
        book.title ||
        "Untitled Book",

      creator:
        book.creator ||
        "Unknown Author",

      year:
        book.year ||
        "Unknown",

      language:
        book.language ||
        "English",

      collection:
        book.collection ||
        "Digital Library",

      description:
        book.description ||
        "No description available.",

      image:
        book.image ||
        book.thumbnail ||
        book.cover ||
        (book.identifier
          ? `https://archive.org/services/img/${book.identifier}`
          : "/placeholder.jpg"),

      pdfUrl:
        book.pdfUrl ||
        book.pdf ||
        (book.identifier
          ? `https://archive.org/download/${book.identifier}/${book.identifier}.pdf`
          : ""),
    };

    return NextResponse.json(formattedData);

  } catch (error) {

    console.error(
      "Failed to fetch book:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch book",
      },
      {
        status: 500,
      }
    );
  }
}