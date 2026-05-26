import connectDB
from "../../../lib/mongodb";

import Book
from "../../../models/Book";

import booksData
from "../../../data/books.json";

export async function GET() {

  try {

    await connectDB();

    // MONGODB BOOKS

    const mongoBooks =
      await Book.find()
        .sort({
          createdAt: -1,
        });

    // FORMAT MONGO BOOKS

    const formattedMongo =
      mongoBooks.map(
        (book) => ({

          _id: book._id,

          title: book.title,

          creator: book.creator,

          coverImage:
            book.coverImage,

          pdfUrl:
            book.pdfUrl,

          source:
            "mongo",
        })
      );

    // FORMAT OLD JSON BOOKS

    const formattedJson =
      booksData.map(
        (book, index) => ({

          _id:
            `json-${index}`,

          title:
            book.title,

          creator:
            book.creator,

          identifier:
            book.identifier,

          source:
            "archive",
        })
      );

    // MERGE BOTH

    const allBooks = [

      ...formattedMongo,

      ...formattedJson,
    ];

    return Response.json({

      success: true,

      books: allBooks,
    });

  } catch (err) {

    return Response.json({

      success: false,

      error: err.message,
    });
  }
}