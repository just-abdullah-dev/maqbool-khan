import mongoose from "mongoose";
import Course from "./course";

const specializationSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    link: {type: String, required: true},
    courses: {type: [mongoose.Schema.Types.ObjectId], ref: "Course" },
    professorId: {type: String, required: true}
  }
);

let Specialization;
try {
  Specialization = mongoose.model('Specialization');
} catch (e) {
  Specialization = mongoose.model('Specialization', specializationSchema);
}

export default Specialization;
