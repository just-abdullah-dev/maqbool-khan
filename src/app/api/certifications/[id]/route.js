import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Certification from "@/models/certifications";
import fileRemover from "@/utils/fileRemover";
import resError from "@/utils/resError";
import uploadFiles from "@/utils/uploadFiles";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const data = await userAuthGuard(req);
    if (!data?.success) {
      return resError(data?.message);
    }

    const { id } = params;
    const formData = await req.formData();
    let body = formData.getAll("body")[0];
    body = JSON.parse(body); 
    let { title, seriesId, certificationId, link } = body;
    if (!title || !link || !seriesId || !certificationId) {
      return resError("Please fill all fields.");
    }
    const uploadedFiles = await uploadFiles(formData);
    const certi = await Certification.create({
      title,
      seriesId,
      certificationId,
      link,
      professorId: id,
      image: uploadedFiles[0]
    });

    return NextResponse.json(
      {
        success: true,
        message: `${certi?.title} has been added.`,
        data: certi,
      },
      { status: 201 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await Certification.find({ professorId: id });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return resError(error?.message);
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const data = await userAuthGuard(req);
    if (!data?.success) {
      return resError(data?.message);
    }
    
    const { id } = params;
    const formData = await req.formData();

    let body = formData.getAll("body")[0];
    body = JSON.parse(body); 
    let { title, seriesId, certificationId, link } = body;

    const uploadedFiles = await uploadFiles(formData);

    let certi = await Certification.findOne({ _id: id });
    if (!certi) {
      return resError(`${id} not found in database.`);
    }
    certi.title = title || certi.title;
    certi.seriesId = seriesId || certi.seriesId;
    certi.link = link || certi.link;
    certi.certificationId = certificationId || certi.certificationId;
    if(uploadedFiles[0] !== null){
      if(certi.image !== ""){
        fileRemover(certi.image);
      }
      certi.image = uploadedFiles[0];
    }
    const updatedCerti = await certi.save();

    return NextResponse.json(
      {
        success: true,
        message: `${updatedCerti?.title} has been updated.`,
        data: updatedCerti,
      },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError(authData?.message);
    }
    const { id } = params;
    const data = await Certification.findOneAndDelete({ _id: id });
    if (!data) {
      return resError(`${id} not found in database.`);
    }
    if(data.image !== ""){
      fileRemover(data.image);
    }
    return NextResponse.json(
      {
        success: true,
        message: `${data?.title} publication has been deleted.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
