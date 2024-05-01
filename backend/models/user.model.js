import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String, // name of image file
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
