import mongoose from "mongoose";

const publicationSchema = mongoose.Schema(
  {
    professorId: {type : String, required: true},
    title: {type: String, required: true},
    link: {type : String, default: ""},
    year: {type: String, default: ""},
    members: {type: [String]},
    showOnHome: { type: Boolean, default: false },
  }
);

let Publications;
try {
  Publications = mongoose.model('Publications');
} catch (e) {
  Publications = mongoose.model('Publications', publicationSchema);
}

export default Publications;

