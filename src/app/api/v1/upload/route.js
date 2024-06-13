import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import fileRemover from "@/utils/fileRemover";
import resError from "@/utils/resError";
import fs from "fs";
import { NextResponse } from "next/server";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

export async function POST(req, res) {
  try {
    await connectDB();
    const data = await userAuthGuard(req);
    if (!data?.success) {
      return resError(data?.message);
    }
    const formData = await req.formData();
    const files = formData.getAll("files");
    let fileNames = [];
    const uploadPromises = files.map(async (file)=>{
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `./public/uploads/${fileName}`;
      await pump(file.stream(), fs.createWriteStream(filePath));
      fileNames.push(fileName);
    });
    // waiting for the upload of files
    await Promise.all(uploadPromises);
    return NextResponse.json({ success: true, data: fileNames });
  } catch (e) {
    return resError(e?.message);
  }
}

export async function DELETE(req, res){
  try {
    await connectDB();
  const authData = await userAuthGuard(req);
  if (!authData?.success) {
    return resError(authData?.message);
  }

  const body = await req.json();
  const { data } = body;
  data.map((file)=>{
    fileRemover(file)
  })
  return NextResponse.json({
    success: true,
    message: `All file's are removed.`
  })
  } catch (error) {
    return resError(error?.message);
  }
}