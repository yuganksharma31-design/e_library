export async function GET(req, { params }) {

  try {

    const id = params.id;

    if (!id) {

      return new Response(
        "Invalid identifier",
        { status: 400 }
      );
    }

    // FETCH METADATA

    const metadataRes = await fetch(
      `https://archive.org/metadata/${id}`
    );

    if (!metadataRes.ok) {

      return Response.redirect(
        `https://archive.org/download/${id}`
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

    // NO PDF

    if (!pdfFile) {

      return Response.redirect(
        `https://archive.org/download/${id}`
      );
    }

    // PDF URL

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