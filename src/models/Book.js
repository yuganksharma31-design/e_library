import mongoose from "mongoose";

const BookSchema =
  new mongoose.Schema({

    title: String,

    creator: String,

    type: String,

    coverImage: String,

    pdfUrl: String,

    source: String,

    pages: [String],

    bookmarks: [

      {
        page: Number,

        title: String,
      }
    ],

  }, {

    timestamps: true,
  });

export default mongoose.models.Book ||

mongoose.model(
  "Book",
  BookSchema
);