import connectDB
from "../../../../lib/mongodb";

import Book
from "../../../../models/Book";

import cloudinary
from "../../../../lib/cloudinary";

export async function POST(req) {

  try {

    await connectDB();

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

    // COVER UPLOAD

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

    // PDF UPLOAD

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
                resource_type:
                  "raw",

                folder:
                  "books",
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

    // SAVE TO DB

    const newBook =
      await Book.create({

        title,

        creator,

        type,

        coverImage:
          coverUpload.secure_url,

        pdfUrl:
          pdfUpload.secure_url,
      });

    return Response.json({

      success: true,

      book: newBook,
    });

  } catch (err) {

    return Response.json({

      success: false,

      error: err.message,
    });
  }
}