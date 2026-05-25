import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: String,
    identifier: String,
    image: String,
    pdf: String,
    creator: String,
    collection: String,
    mediatype: String,
  },
  { timestamps: true }
);

export default mongoose.models.Book ||
  mongoose.model("Book", BookSchema);