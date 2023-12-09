import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  uid: { type: String, required: true },
  tags: {
    type: [String],
    required: true,
  },
});

const Image = mongoose.models.images || mongoose.model("images", imageSchema);

export default Image;
