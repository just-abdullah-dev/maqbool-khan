import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    link: {type: String, required: true},
    institute: {type: String, default: ""},
    desc: {type: String, default: ""},
    isCompleted: {type: Boolean, default: true},
    from: { type: Date },
    to: { type: Date },
    responsibilities: {type: [String]},
    professorId: {type: String, required: true},
    showOnHome: { type: Boolean, default: false },
  }
);

let Project;
try {
  Project = mongoose.model('Project');
} catch (e) {
  Project = mongoose.model('Project', projectSchema);
}

export default Project;
