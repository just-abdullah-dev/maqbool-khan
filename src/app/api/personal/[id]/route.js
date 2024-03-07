import connectDB from "@/lib/db";
import Personal from "@/models/personal";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

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

    return NextResponse.json({ success: true, data: user }, {status: 201});

    } catch (error) {
        return resError(error?.message)
    }
}

export async function GET(req, { params }) {
    try {
      const {id} = params;
      await connectDB();
      const data = await Personal.findOne({id});
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
        const {id} = params;
      const body = await req.json();
      const {name, bio, about, currentPosition, contact, socials} = body;
      
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

    const updatedUser = await user.save();
    return NextResponse.json({
        success: true,
        data: updatedUser
    }, {status: 200})
    
    } catch (error) {
      return resError(error?.message)
    }
}

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
