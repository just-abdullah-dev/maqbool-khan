import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true},
    body: {type: String, required: true},
    professorId: {type: String, required: true}
  }
);

let ContactMails;
try {
  ContactMails = mongoose.model('ContactMails');
} catch (e) {
  ContactMails = mongoose.model('ContactMails', contactSchema); 
}

export default ContactMails;
