import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
  title: {type: String},
  link: {type: String}
}); 

const researchSchema = mongoose.Schema(
  {
    interest: {type: [String]},
    reviewer: {type: [String]},
    professorId: {type : String},
    organizationChair: {type: [String]},
    sessionChair: {type : [String]},
    member: {type: [memberSchema]},
    members: {type: [Object]}, 
  }
);

let Research;
try {
  Research = mongoose.model('Research');
} catch (e) {
  Research = mongoose.model('Research', researchSchema);
}

export default Research;
