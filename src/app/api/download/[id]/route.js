export async function GET(req, context) {

  try {

    const { id } = await context.params;

    // METADATA

    const metadataRes = await fetch(
      `https://archive.org/metadata/${id}`
    );

    const metadata = await metadataRes.json();

    if (!metadata.files) {

      return new Response(
        "No files found",
        { status: 404 }
      );
    }

    // FIND PDF

    const pdfFile = metadata.files.find(
      (file) =>
        file.name &&
        file.name.toLowerCase().endsWith(".pdf")
    );

    if (!pdfFile) {

      return new Response(
        "PDF not found",
        { status: 404 }
      );
    }

    // REAL PDF URL

    const pdfUrl =
      `https://archive.org/download/${id}/${pdfFile.name}`;

    // FETCH PDF

    const pdfResponse =
      await fetch(pdfUrl);

    if (!pdfResponse.ok) {

      return new Response(
        "Download failed",
        { status: 500 }
      );
    }

    // STREAM PDF

    return new Response(
      pdfResponse.body,
      {
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="${pdfFile.name}"`,
        },
      }
    );

  } catch (error) {

    console.error(error);

    return new Response(
      "Download failed",
      { status: 500 }
    );
  }
}