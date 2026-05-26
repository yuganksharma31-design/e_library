import connectDB from "../../../../lib/mongodb";
import Book from "../../../../models/Book";
import cloudinary from "../../../../lib/cloudinary";

export async function POST(req) {

  try {

    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const creator = formData.get("creator");
    const type = formData.get("type");

    const cover = formData.get("cover");
    const pdf = formData.get("pdf");

    if (!title || !creator || !cover || !pdf) {

      return Response.json({
        success: false,
        error: "Missing fields",
      });
    }

    // =========================
    // UPLOAD COVER
    // =========================

    const coverBytes = await cover.arrayBuffer();

    const coverBuffer =
      Buffer.from(coverBytes);

    const coverUpload =
      await new Promise((resolve, reject) => {

        cloudinary.uploader.upload_stream(

          {
            folder: "covers",
          },

          (error, result) => {

            if (error) reject(error);

            else resolve(result);
          }

        ).end(coverBuffer);
      });

    // =========================
    // UPLOAD PDF
    // =========================

    const pdfBytes = await pdf.arrayBuffer();

    const pdfBuffer =
      Buffer.from(pdfBytes);

    const pdfUpload =
      await new Promise((resolve, reject) => {

        cloudinary.uploader.upload_stream(

          {
            resource_type: "raw",
            folder: "books",
            public_id: `${Date.now()}`,
          },

          (error, result) => {

            if (error) reject(error);

            else resolve(result);
          }

        ).end(pdfBuffer);
      });

    // =========================
    // SAVE BOOK
    // =========================

    const newBook = new Book({

      title,
      creator,
      type,

      coverImage:
        coverUpload.secure_url,

      pdfUrl:
        pdfUpload.secure_url,

      source: "mongo",
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
      error: err.message,
    });
  }
}