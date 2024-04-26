import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, default: "" },
  parent: { type: String, required: true },
});

let Course; 
try {
  Course = mongoose.model("Course");
} catch (e) {
  Course = mongoose.model("Course", courseSchema);
}

export default Course;
