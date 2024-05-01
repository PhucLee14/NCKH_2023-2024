import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    images: {
      type: Array,
    },
    authorId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const newsFeedModel = mongoose.model("posts", postSchema);

export default newsFeedModel;
