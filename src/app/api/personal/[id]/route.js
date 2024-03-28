import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Personal from "@/models/personal";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  try {
    await connectDB();
    const {id} = params;
      const data = await Personal.findOne({id}).select("-password");
      if(!data){
        return resError(`${id} not found in database.`)
      }
      return NextResponse.json({ success: true, data }, {status: 200});
    } catch (error) {
      return resError(error?.message)
    }
  }
  
export async function PUT (req, {params}) {
  try {
    await connectDB();
    const data = await userAuthGuard(req);
    if(!data?.success){
      return resError(data?.message);
    }
    const {id} = params;
    const body = await req.json();
    const {name, bio, about, currentPosition, contact, socials, password} = body;
    
    await connectDB();
    let user = await Personal.findOne({id});
    if(!user){
      return resError(`${id} not found in database.`)
    }
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.about = about || user.about;
    user.currentPosition = currentPosition || user.currentPosition;
    user.contact = contact || user.contact;
    user.socials = socials || user.socials;
    user.password = password || user.password;
    
    const updatedUser = await user.save();
    updatedUser.password = "";
    return NextResponse.json({
      success: true,
      message: `${updatedUser?.name?.first} profile has been updated.`,
        data: updatedUser
      }, {status: 200})
      
    } catch (error) {
      return resError(error?.message)
    }
}

// only for developer
export async function POST (req, {params}) {
    try {
        const {id} = params;
        let user = await Personal.findOne({id});
        if(user){
            return resError(`${id} account already exist.`)
        }
        const body = await req.json();
        const {name, bio, about, currentPosition, contact, socials, password} = body;
        if(!name || !bio || !about || !currentPosition || !contact || !socials || !password){
          return resError("Please fill all fields.");
      }
      await connectDB();
      user = await Personal.create({
        name,
        bio,
        about,
        currentPosition,
        contact,
        socials,
        password,
        id,
      })

    return NextResponse.json({ success: true, message: "USER created successfully", data: user }, {status: 201});

    } catch (error) {
        return resError(error?.message)
    }
}


// only for developer
export async function DELETE(req, { params }) {
  try {
    const {id} = params;
    await connectDB();
    const data = await Personal.findOneAndDelete({id});
    if(!data){
      return resError(`${id} not found in database.`)
    }
      return NextResponse.json({ success: true, message: `${id} user has been deleted.` }, {status: 200});
    } catch (error) {
      return resError(error?.message)
    }
}