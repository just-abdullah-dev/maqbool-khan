import mongoose from "mongoose";

const educationSchema = mongoose.Schema(
  {
    degree: {type: String, required: true},
    field: { type: String },
    desc: { type: String, default: "" },
    institute: { type: String, required: true },
    country: { type: String, default: ""},
    from: { type: Date },
    to: { type: Date },
    professorId: {type: String, default: ""}
  }
);

let Education;
try {
  Education = mongoose.model('Education');
} catch (e) {
  Education = mongoose.model('Education', educationSchema);
}

export default Education;
