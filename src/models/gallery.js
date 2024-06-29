import mongoose from "mongoose";

const gallerySchema = mongoose.Schema(
  {
    professorId: {type : String, required: true},
    countryName: {type: String, required: true},
    slug: {type: String, required: true},
    images: {type: [String]},
    showOnHome: { type: Boolean, default: false },
  }
);

let Gallery;
try {
  Gallery = mongoose.model('Gallery');
} catch (e) {
  Gallery = mongoose.model('Gallery', gallerySchema);
}

export default Gallery;
