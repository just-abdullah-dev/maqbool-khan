import mongoose from "mongoose";

const publicationSchema = mongoose.Schema(
  {
    members: {type: [String]},
    solo: { type: Boolean, default: false },
    professorId: {type : String, required: true},
    title: {type: String, required: true},
    link: {type : String, default: ""},
    year: {type: String, default: ""}
  }
);

let Publications;
try {
  Publications = mongoose.model('Publications');
} catch (e) {
  Publications = mongoose.model('Publications', publicationSchema);
}

export default Publications;
