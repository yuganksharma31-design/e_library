export async function GET(req, context) {

  try {

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

    if (
      !metadata ||
      !metadata.files ||
      metadata.files.length === 0
    ) {

      // FALLBACK

      return Response.redirect(
        `https://archive.org/download/${id}`
      );
    }

    // FIND PDF

    const pdfFile =
      metadata.files.find(
        (file) =>
          file.name &&
          file.name
            .toLowerCase()
            .includes(".pdf")
      );

    // IF NO PDF FOUND

    if (!pdfFile) {

      // FALLBACK

      return Response.redirect(
        `https://archive.org/download/${id}`
      );
    }

    // REAL PDF URL

    const pdfUrl =
      `https://archive.org/download/${id}/${pdfFile.name}`;

    // FETCH PDF

    const pdfResponse =
      await fetch(pdfUrl);

    if (!pdfResponse.ok) {

      return Response.redirect(
        `https://archive.org/download/${id}`
      );
    }

    // STREAM FILE

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