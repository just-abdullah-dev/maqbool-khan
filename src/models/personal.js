import mongoose from "mongoose";
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const nameSchema = mongoose.Schema({
  title: { type: String, required: true },
  first: { type: String, required: true },
  middle: { type: String, required: false },
  last: { type: String, required: false },
});

const positionSchema = mongoose.Schema({
  title: { type: String, required: true },
  at: { type: String, required: true },
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

const personalSchema = mongoose.Schema(
  {
    id: {type: String, default: ''},
    avatar: { type: String, default: "" },
    name: { type: nameSchema, required: true },
    bio: { type: String, default: "" },
    about: { type: String, default: "" },
    currentPosition: { type: positionSchema },
    contact: { type: contactSchema },
    socials: { type: socialsSchema },
    password: { type: String, default: '' },
    cv: { type: String, default: '' },
    bgImages: { type: [String], default: ["sample.jpeg"] },
  }
);
personalSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

personalSchema.methods.generateJWT = async function () {
  return sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

personalSchema.methods.comparePassword = async function (enteredPassword) {
  return compare(enteredPassword, this.password);
};

let Personal;
try {
  Personal = mongoose.model('Personal');
} catch (e) {
  Personal = mongoose.model('Personal', personalSchema);
}

export default Personal;
