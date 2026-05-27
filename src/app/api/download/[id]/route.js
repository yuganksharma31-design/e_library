import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    const fileUrl =
      book.downloadUrl ||
      book.pdfUrl ||
      book.archiveUrl ||
      book.fileUrl;

    if (!fileUrl) {
      return NextResponse.json(
        { error: "No file URL found" },
        { status: 404 }
      );
    }

    const response = await fetch(fileUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch PDF" },
        { status: 500 }
      );
    }

    const blob = await response.blob();

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${book.title}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Download failed" },
      { status: 500 }
    );
  }
}