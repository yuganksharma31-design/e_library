import { NextResponse } from "next/server";

import manuscripts from "@/data/manuscripts.json";

export async function GET() {
  try {

    const formattedData = manuscripts.map(
      (item, index) => ({

        _id:
          item._id ||
          item.identifier ||
          index + 1,

        identifier:
          item.identifier ||
          item._id,

        title:
          item.title ||
          "Untitled Manuscript",

        collection:
          item.collection ||
          "Unknown Collection",

        language:
          item.language ||
          "Sanskrit",

        year:
          item.year ||
          "Unknown",

        creator:
          item.creator ||
          "Unknown",

        description:
          item.description ||
          "",

        image:
          item.image ||
          item.thumbnail ||
          item.cover ||
          (item.identifier
            ? `https://archive.org/services/img/${item.identifier}`
            : "/placeholder.jpg"),

        pdfUrl:
          item.pdfUrl ||
          item.pdf ||
          (item.identifier
            ? `https://archive.org/download/${item.identifier}/${item.identifier}.pdf`
            : ""),
      })
    );

    return NextResponse.json(formattedData);

  } catch (error) {

    console.error(
      "Failed to load manuscripts:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load manuscripts",
      },
      {
        status: 500,
      }
    );
  }
}