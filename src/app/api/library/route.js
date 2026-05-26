import connectDB
from "../../../lib/mongodb";

import Book
from "../../../models/Book";

export async function GET() {

  try {

    await connectDB();

    const books =
      await Book.find()
        .sort({
          createdAt: -1,
        });

    return Response.json({

      success: true,

      books,
    });

  } catch (err) {

    return Response.json({

      success: false,

      error: err.message,
    });
  }
}