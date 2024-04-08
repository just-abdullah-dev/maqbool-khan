import mongoose from "mongoose";

const experienceSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    link: { type: String, required: true },
    desc: { type: String, default: "" },
    company: { type: String, default: "" },
    from: { type: Date},
    to: { type: Date },
    professorId: {type: String, default: ""}
  }
);

let Experience; 
try {
  Experience = mongoose.model('Experience');
} catch (e) {
  Experience = mongoose.model('Experience', experienceSchema);
}

export default Experience;
