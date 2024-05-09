import mongoose from "mongoose";

const astrologerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  specialities: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("Astrologer", astrologerSchema);
