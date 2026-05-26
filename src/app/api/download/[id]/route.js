export async function GET(req, { params }) {

  try {

    const id = params.id;

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

    if (
      !metadata.files ||
      metadata.files.length === 0
    ) {

      return Response.redirect(
        `https://archive.org/download/${id}`
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

      return Response.redirect(
        `https://archive.org/download/${id}`
      );
    }

    const pdfUrl =
      `https://archive.org/download/${id}/${pdfFile.name}`;

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