import connectDB
from "../../../../lib/mongodb";

import Book
from "../../../../models/Book";

import cloudinary
from "../../../../lib/cloudinary";

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

              (
                err,
                result
              ) => {

                if (err) {

                  console.log(
                    "Cover Upload Error:",
                    err
                  );

                  reject(err);

                } else {

                  resolve(result);
                }
              }
            )
            .end(coverBuffer);
        }
      );

// ======================
// PDF UPLOAD
// ======================

const pdfBuffer =
  Buffer.from(
    await pdf.arrayBuffer()
  );

const fileName =
  `${Date.now()}.pdf`;

const pdfUpload =
  await new Promise(
    (resolve, reject) => {

      cloudinary.uploader
        .upload_stream(

          {
            resource_type:
              "raw",

            folder:
              "books",

            public_id:
              fileName,
          },

          (
            err,
            result
          ) => {

            if (err) {

              console.log(
                "PDF Upload Error:",
                err
              );

              reject(err);

            } else {

              resolve(result);
            }
          }
        )
        .end(pdfBuffer);
    }
  );
    // =========================
    // SAVE TO MONGODB
    // =========================

    const newBook =
      new Book({

        title,

        creator,

        type,

        coverImage:
          coverUpload.secure_url,

        pdfUrl:
          pdfUpload.secure_url,
      });

    await newBook.save();

    console.log(
      "BOOK SAVED:",
      newBook
    );

    // SUCCESS RESPONSE

    return Response.json({

      success: true,

      book: newBook,
    });

  } catch (err) {

    console.log(
      "UPLOAD ERROR:",
      err
    );

    return Response.json({

      success: false,

      error:
        err.message ||
        "Upload failed",
    });
  }
}