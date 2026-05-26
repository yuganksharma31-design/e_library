import mongoose from "mongoose";

const BookSchema =
  new mongoose.Schema({

    title: String,

    creator: String,

    identifier: String,

    type: String,

    coverImage: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

export default
  mongoose.models.Book ||

  mongoose.model(
    "Book",
    BookSchema
  );