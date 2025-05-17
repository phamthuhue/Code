import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      // required: true,
    },
    resetPasswordToken: {
      type:String,
      unique:true,
    },
    resetPasswordExpires: {
      type:String,
      unique:true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
