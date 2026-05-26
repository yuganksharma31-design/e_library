import connectDB from "../../../../lib/mongodb";

import Book from "../../../../models/Book";

export async function POST(req) {

  try {

    await connectDB();

    const body =
      await req.json();

    const newBook =
      await Book.create({

        title: body.title,

        creator: body.creator,

        identifier: body.identifier,

        type: body.type,

        coverImage:
          body.coverImage,
      });

    return Response.json({
      success: true,
      book: newBook,
    });

  } catch (err) {

    return Response.json({

      success: false,

      error: err.message,
    });
  }
}