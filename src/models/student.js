import mongoose from "mongoose";

const nameSchema = mongoose.Schema({
  title: { type: String, required: false },
  first: { type: String, required: true },
  middle: { type: String, required: false },
  last: { type: String, required: false },
});

const positionSchema = mongoose.Schema({
  title: { type: String },
  at: { type: String },
});

const contactSchema = mongoose.Schema({
  phone: { type: Number },
  email: { type: String },
});

const socialsSchema = mongoose.Schema({
  instagram: { type: String, default: "" },
  twitter: { type: String, default: "" },
  facebook: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  googleScholar: { type: String, default: "" },
  researchGate: { type: String, default: "" },
});

const stdSchema = mongoose.Schema(
  {
    showOnHome: {type: Boolean, default: false},
    avatar: { type: String, default: "" },
    cover: { type: String, default: "" },
    name: { type: nameSchema, required: true },
    bio: { type: String, default: "" },
    about: { type: String, default: "" },
    currentPosition: { type: positionSchema },
    contact: { type: contactSchema },
    socials: { type: socialsSchema },
    professorId: {type: String, required: true}
  }
);

let Student;
try {
  Student = mongoose.model('Student');
} catch (e) {
  Student = mongoose.model('Student', stdSchema);
}

export default Student;
