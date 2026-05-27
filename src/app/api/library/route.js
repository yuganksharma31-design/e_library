import { NextResponse } from "next/server";

import books from "@/data/books.json";

export async function GET() {

  try {

    return NextResponse.json(books);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load books",
      },
      {
        status: 500,
      }
    );
  }
}