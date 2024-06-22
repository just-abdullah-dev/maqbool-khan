import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

export default async function uploadMentionedFile(formData, type = "files"){
    const files = formData.getAll(type);
    let fileNames = [];
    const uploadPromises = files.map(async (file)=>{
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `./public/uploads/${fileName}`;
      await pump(file.stream(), fs.createWriteStream(filePath));
      fileNames.push(fileName);
    });
    // waiting for the upload of files
    await Promise.all(uploadPromises);
    return fileNames;
  }
  