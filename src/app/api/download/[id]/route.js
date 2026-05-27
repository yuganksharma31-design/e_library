export async function GET(req, context) {

  try {

    const id =
      context.params.id;

    // ARCHIVE METADATA

    const metadataUrl =
      `https://archive.org/metadata/${id}`;

    const metaResponse =
      await fetch(metadataUrl);

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

    // FALLBACK TO DJVU

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

    // REDIRECT

    return Response.redirect(
      fileUrl,
      302
    );

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