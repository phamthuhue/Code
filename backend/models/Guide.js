import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
  name: String,
  photo: String,
  bio: String,
  tours: [{ type: mongoose.Schema.Types.ObjectId, ref: "tours" }],
});

export default mongoose.model("Guide", guideSchema);