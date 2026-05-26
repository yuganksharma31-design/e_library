import connectDB from "../../../../lib/mongodb";
import Book from "../../../../models/Book";
import cloudinary from "../../../../lib/cloudinary";

export async function POST(req) {

  try {

    // CONNECT DATABASE

    await connectDB();

    // FORM DATA

    const formData =
      await req.formData();

    const title =
      formData.get("title");

    const creator =
      formData.get("creator");

    const type =
      formData.get("type");

    const cover =
      formData.get("cover");

    const pdf =
      formData.get("pdf");

    // VALIDATION

    if (
      !title ||
      !creator ||
      !cover ||
      !pdf
    ) {

      return Response.json({

        success: false,

        error:
          "Missing required fields",
      });
    }

    // =========================
    // COVER IMAGE UPLOAD
    // =========================

    const coverBuffer =
      Buffer.from(
        await cover.arrayBuffer()
      );

    const coverUpload =
      await new Promise(
        (resolve, reject) => {

          cloudinary.uploader
            .upload_stream(

              {
                folder:
                  "covers",
              },

              (err, result) => {

                if (err)
                  reject(err);

                else
                  resolve(result);
              }
            )
            .end(coverBuffer);
        }
      );

// =========================
// PDF UPLOAD
// =========================

const pdfBuffer =
  Buffer.from(
    await pdf.arrayBuffer()
  );

const pdfUpload =
  await new Promise(
    (resolve, reject) => {

      cloudinary.uploader
        .upload_stream(

          {
            resource_type: "image",
            folder: "books",
            format: "pdf",
            public_id:
              Date.now().toString(),
          },

          (err, result) => {

            if (err)
              reject(err);

            else
              resolve(result);
          }
        )
        .end(pdfBuffer);
    }
  );

// FIX PDF URL

const pdfUrl =
  pdfUpload.secure_url
    .replace(
      "/upload/",
      "/upload/fl_attachment:false,f_pdf/"
    );
    // =========================
    // SAVE TO DATABASE
    // =========================

    const newBook =
      new Book({

        title,

        creator,

        type,

        coverImage:
          coverUpload.secure_url,

        pdfUrl:
  pdfUrl,

        source:
          "mongo",
      });

    await newBook.save();

    return Response.json({

      success: true,

      book: newBook,
    });

  } catch (err) {

    console.log(err);

    return Response.json({

      success: false,

      error:
        err.message,
    });
  }
}