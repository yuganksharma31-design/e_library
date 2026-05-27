export async function GET(req, { params }) {

  try {

    const id =
      decodeURIComponent(params.id);

    if (!id) {

      return new Response(
        "Invalid identifier",
        { status: 400 }
      );
    }

    // FETCH METADATA

    const metadataRes =
      await fetch(
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

    if (!pdfFile) {

      return new Response(
        "PDF not available",
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
        "PDF download failed",
        { status: 500 }
      );
    }

    // RETURN PDF

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

    console.log(error);

    return new Response(
      "Download failed",
      
      { status: 500 }
    );
  }
}