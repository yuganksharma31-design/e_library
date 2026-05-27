import { NextResponse } from "next/server";

export async function GET(req, { params }) {

  try {

    const { id } = params;

    // REDIRECT TO ARCHIVE DOWNLOAD PAGE

    const archiveUrl =
      `https://archive.org/download/${id}`;

    return NextResponse.redirect(
      archiveUrl
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