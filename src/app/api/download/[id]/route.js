export async function GET(request, { params }) {

  try {

    const id = params?.id;

    if (!id) {

      return new Response(
        "Invalid identifier",
        { status: 400 }
      );
    }

    const metadataRes = await fetch(
      `https://archive.org/metadata/${id}`
    );

    const metadata =
      await metadataRes.json();

    if (!metadata.files) {

      return new Response(
        "No files found",
        { status: 404 }
      );
    }

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
        "PDF not found",
        { status: 404 }
      );
    }

    const pdfUrl =
      `https://archive.org/download/${id}/${encodeURIComponent(pdfFile.name)}`;

    const pdfResponse =
      await fetch(pdfUrl);

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