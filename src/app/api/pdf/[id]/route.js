import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET(req, { params }) {

  try {

    await connectDB();

    const book =
      await Book.findById(
        params.id
      );

    if (!book) {

      return new Response(
        "Book not found",
        { status: 404 }
      );
    }

    return Response.redirect(
      book.pdfUrl
    );

  } catch (err) {

    return new Response(
      "Server Error",
      { status: 500 }
    );
  }
}