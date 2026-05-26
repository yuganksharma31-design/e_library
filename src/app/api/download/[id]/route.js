export async function GET(req, context) {

  try {

    // GET ID

    const { id } = context.params;

    // FETCH METADATA

    const metadataRes = await fetch(
      `https://archive.org/metadata/${id}`
    );

    if (!metadataRes.ok) {

      return new Response(
        "Metadata fetch failed",
        { status: 500 }
      );
    }

    const metadata =
      await metadataRes.json();

    // CHECK FILES

    if (!metadata.files) {

      return new Response(
        "No files found",
        { status: 404 }
      );
    }

    // FIND PDF FILE

    const pdfFile =
      metadata.files.find(
        (file) =>
          file.name &&
          file.name
            .toLowerCase()
            .endsWith(".pdf")
      );

    // IF PDF NOT FOUND

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

    // RETURN PDF STREAM

    return new Response(
      pdfResponse.body,
      {

        headers: {

          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="${pdfFile.name}"`,

          "Cache-Control":
            "public, max-age=31536000",

          "Access-Control-Allow-Origin":
            "*",
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