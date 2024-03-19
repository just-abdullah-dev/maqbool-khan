import mongoose from "mongoose";

const certificationSchema = mongoose.Schema(
  {
    seriesId: {type: String, default: ""},
    certificationId: {type: String, default: ""},
    professorId: {type : String, required: true},
    title: {type: String, required: true},
    link: {type : String, default: ""},
    image: {type: String, default: ""}
  }
);

let Certification;
try {
  Certification = mongoose.model('Certification');
} catch (e) {
  Certification = mongoose.model('Certification', certificationSchema);
}

export default Certification;
