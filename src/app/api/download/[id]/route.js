import { NextResponse } from "next/server";

export async function GET(req, { params }) {

  try {

    const { id } = params;

    // GET ARCHIVE METADATA

    const metaResponse =
      await fetch(
        `https://archive.org/metadata/${id}`
      );

    if (!metaResponse.ok) {

      return NextResponse.json(
        {
          error: "Metadata not found"
        },
        {
          status: 404
        }
      );
    }

    const meta =
      await metaResponse.json();

    // FIND PDF FILE

    const pdfFile =
      meta.files.find(
        (file) =>
          file.name &&
          file.name.toLowerCase().endsWith(".pdf")
      );

    if (!pdfFile) {

      return NextResponse.json(
        {
          error: "PDF not found"
        },
        {
          status: 404
        }
      );
    }

    // DIRECT DOWNLOAD URL

    const pdfUrl =
      `https://archive.org/download/${id}/${encodeURIComponent(pdfFile.name)}`;

    // REDIRECT TO PDF

    return NextResponse.redirect(
      pdfUrl
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Download failed"
      },
      {
        status: 500
      }
    );
  }
}