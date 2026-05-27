export async function GET(req, context) {

  try {

    const id =
      context.params.id;

    // GET ARCHIVE METADATA

    const metaResponse =
      await fetch(
        `https://archive.org/metadata/${id}`
      );

    const meta =
      await metaResponse.json();

    // FIND PDF

    const pdfFile =
      meta.files.find(
        (file) =>
          file.name &&
          file.name
            .toLowerCase()
            .endsWith(".pdf")
      );

    // FALLBACK DJVU

    const djvuFile =
      meta.files.find(
        (file) =>
          file.name &&
          file.name
            .toLowerCase()
            .endsWith(".djvu")
      );

    const targetFile =
      pdfFile || djvuFile;

    if (!targetFile) {

      return Response.json(
        {
          error:
            "No downloadable file found"
        },
        {
          status: 404
        }
      );
    }

    // DIRECT FILE URL

    const fileUrl =
      `https://archive.org/download/${id}/${encodeURIComponent(targetFile.name)}`;

    // FETCH REAL FILE

    const fileResponse =
      await fetch(fileUrl);

    if (!fileResponse.ok) {

      return Response.json(
        {
          error:
            "Failed to fetch file"
        },
        {
          status: 500
        }
      );
    }

    // GET FILE BUFFER

    const blob =
      await fileResponse.arrayBuffer();

    // RETURN DOWNLOAD DIRECTLY

    return new Response(blob, {

      status: 200,

      headers: {

        "Content-Type":
          pdfFile
            ? "application/pdf"
            : "application/octet-stream",

        "Content-Disposition":
          `attachment; filename="${targetFile.name}"`,

        "Cache-Control":
          "public, max-age=0, must-revalidate",
      },
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error: "Download failed"
      },
      {
        status: 500
      }
    );
  }
}