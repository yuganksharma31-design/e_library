import { NextResponse } from "next/server";

import manuscripts from "@/data/manuscripts.json";

export async function GET(request, { params }) {
  try {

    const manuscript = manuscripts.find(
      (item) => {

        const itemId =
          item._id?.toString() ||
          item.identifier?.toString();

        return itemId === params.id;
      }
    );

    // NOT FOUND
    if (!manuscript) {

      return NextResponse.json(
        {
          error: "Manuscript not found",
        },
        {
          status: 404,
        }
      );
    }

    // FORMAT DATA
    const formattedData = {

      _id:
        manuscript._id ||
        manuscript.identifier,

      identifier:
        manuscript.identifier ||
        manuscript._id,

      title:
        manuscript.title ||
        "Untitled Manuscript",

      collection:
        manuscript.collection ||
        "Unknown Collection",

      language:
        manuscript.language ||
        "Sanskrit",

      year:
        manuscript.year ||
        "Unknown",

      creator:
        manuscript.creator ||
        "Unknown",

      description:
        manuscript.description ||
        "No description available.",

      image:
        manuscript.image ||
        manuscript.thumbnail ||
        manuscript.cover ||
        (manuscript.identifier
          ? `https://archive.org/services/img/${manuscript.identifier}`
          : "/placeholder.jpg"),

      pdfUrl:
        manuscript.pdfUrl ||
        manuscript.pdf ||
        (manuscript.identifier
          ? `https://archive.org/download/${manuscript.identifier}/${manuscript.identifier}.pdf`
          : ""),
    };

    return NextResponse.json(formattedData);

  } catch (error) {

    console.error(
      "Failed to fetch manuscript:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch manuscript",
      },
      {
        status: 500,
      }
    );
  }
}