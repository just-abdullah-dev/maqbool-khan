import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Student from "@/models/student";
import fileRemover from "@/utils/fileRemover";
import getSearchParams from "@/utils/getSearchParams";
import resError from "@/utils/resError";
import uploadMentionedFile from "@/utils/uploadMentionedFile";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const searchParams = getSearchParams(req);

    const typeOfStd = searchParams.get('typeOfStd');
    const showOnHome = searchParams.get('showOnHome');

    let query;
    if(showOnHome === 'yes'){
      if(typeOfStd){
        query = { professorId: id, showOnHome: true, typeOfStd: typeOfStd };
      }else{
        query = { professorId: id, showOnHome: true };
      }
    }else{
      if(typeOfStd){
        query = { professorId: id, typeOfStd: typeOfStd };
      }else{
        query = { professorId: id };
      }
    }

    const data = await Student.find(query);

    if (!data) {
      return resError(`No student of ${id} was found in database.`);
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return resError(error?.message);
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();

    const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError(authData?.message);
    }

    const { id } = params;

    const formData = await req.formData();
    let body = formData.getAll("body")[0];
    body = JSON.parse(body);

    const { name, bio, about, currentPosition, contact, socials, showOnHome, typeOfStd } =
      body;

    const uploadedAvatar = await uploadMentionedFile(formData, "avatar");
    const uploadedCover = await uploadMentionedFile(formData, "cover");

    const std = await Student.create({
      name, bio, about, currentPosition, contact, socials, professorId: id, typeOfStd
    });

    let user = await Student.findById(std?._id);
    if (!user) {
      return resError(`Error occurered. Student profile not created.`);
    }
    
    if (uploadedAvatar.length > 0) {
      user.avatar = uploadedAvatar[0];
    }

    if (uploadedCover.length > 0) {
      user.cover = uploadedCover[0];
    }
    if(showOnHome === 'yes'){
      user.showOnHome = true;
    }else if(showOnHome === 'no'){
      user.showOnHome = false;
    }

    const updatedUser = await user.save();
    
    return NextResponse.json(
      {
        success: true,
        message: `${updatedUser?.name?.first} profile has been created.`,
        data:  updatedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}


export async function PUT(req, { params }) {
  try {
    await connectDB();

    const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError(authData?.message);
    }

    const { id } = params;
    
    const formData = await req.formData();
    let body = formData.getAll("body")[0];
    body = JSON.parse(body);
    const { name, bio, about, currentPosition, contact, socials, showOnHome } =
      body;
      
    const uploadedAvatar = await uploadMentionedFile(formData, "avatar");
    const uploadedCover = await uploadMentionedFile(formData, "cover");


    let user = await Student.findById(id);
    if (!user) {
      return resError(`Student was not found in database.`);
    }
    
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.about = about || user.about;
    user.currentPosition = currentPosition || user.currentPosition;
    user.contact = contact || user.contact;
    user.socials = socials || user.socials;

    if (uploadedAvatar.length > 0) {
      if (user.avatar) {
        fileRemover(user.avatar);
      }
      user.avatar = uploadedAvatar[0];
    }

    if (uploadedCover.length > 0) {
      if (user.cover) {
        fileRemover(user.cover);
      }
      user.cover = uploadedCover[0];
    }
    if(showOnHome === 'yes'){
      user.showOnHome = true;
    }else if(showOnHome === 'no'){
      user.showOnHome = false;
    }
    const updatedUser = await user.save();
    
    return NextResponse.json(
      {
        success: true,
        message: `${updatedUser?.name?.first} profile has been updated.`,
        data:  updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}


export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await connectDB();

     const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError(authData?.message);
    }

    const data = await Student.findByIdAndDelete(id );
    if (!data) {
      return resError(`${id} not found in database.`);
    }
    if (data?.avatar) {
      fileRemover(data?.avatar);
    }
    if (data?.cover) {
      fileRemover(data?.cover);
    }

    return NextResponse.json(
      { success: true, message: `${data?.name?.first} student has been deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
