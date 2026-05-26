import connectDB from "../../../../lib/mongodb";
import Book from "../../../../models/Book";
import cloudinary from "../../../../lib/cloudinary";

import fs from "fs";
import path from "path";
import os from "os";

export async function POST(req) {

  try {

    // ======================
    // CONNECT DATABASE
    // ======================

    await connectDB();

    // ======================
    // GET FORM DATA
    // ======================

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

    // ======================
    // VALIDATION
    // ======================

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

    // ======================
    // COVER IMAGE UPLOAD
    // ======================

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

    // ======================
    // SAVE TEMP PDF FILE
    // ======================

    const bytes =
      await pdf.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const tempPath =
      path.join(
        os.tmpdir(),
        pdf.name
      );

    fs.writeFileSync(
      tempPath,
      buffer
    );

    // ======================
    // PDF UPLOAD
    // ======================

    const pdfUpload =
      await cloudinary.uploader.upload(

        tempPath,

        {
          resource_type:
            "raw",

          folder:
            "books",

          format:
            "pdf",
        }
      );

    // DELETE TEMP FILE

    fs.unlinkSync(
      tempPath
    );

    // FINAL PDF URL

    const pdfUrl =
      pdfUpload.secure_url;

    // ======================
    // SAVE DATABASE
    // ======================

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

    // ======================
    // RESPONSE
    // ======================

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