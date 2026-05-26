import connectDB
from "../../../../../lib/mongodb";

import Book
from "../../../../../models/Book";

export async function DELETE(
  req,
  { params }
) {

  try {

    await connectDB();

    await Book.findByIdAndDelete(
      params.id
    );

    return Response.json({

      success: true,
    });

  } catch (err) {

    return Response.json({

      success: false,

      error:
        err.message,
    });
  }
}