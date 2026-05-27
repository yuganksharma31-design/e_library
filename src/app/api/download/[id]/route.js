import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {

    const { id } = params;

    // DIRECT ARCHIVE PDF URL

    const pdfUrl =
      `https://archive.org/download/${id}/${id}.pdf`;

    // FETCH PDF

    const response =
      await fetch(pdfUrl);

    if (!response.ok) {

      return NextResponse.json(
        {
          error: "PDF not found"
        },
        {
          status: 404
        }
      );
    }

    // GET FILE

    const blob =
      await response.blob();

    // RETURN DOWNLOAD

    return new NextResponse(blob, {
      headers: {
        "Content-Type":
          "application/pdf",

        "Content-Disposition":
          `attachment; filename="${id}.pdf"`,
      },
    });

  } catch (error) {

    console.error(
      "DOWNLOAD ERROR:",
      error
    );

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