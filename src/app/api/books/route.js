import books from "../../../data/books.json";

import manuscripts from "../../../data/manuscripts.json";

export async function GET() {

  return Response.json({
    books,
    manuscripts,
  });
}