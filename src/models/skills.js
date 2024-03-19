import mongoose from "mongoose";

const skillsSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    items: { type: [String] },
    professorId: {type : String, required: true},
  }
);

let Skills;
try {
  Skills = mongoose.model('Skills');
} catch (e) {
  Skills = mongoose.model('Skills', skillsSchema);
}

export default Skills;
