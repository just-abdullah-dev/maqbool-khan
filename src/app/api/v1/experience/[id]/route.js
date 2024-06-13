import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Experience from "@/models/experience";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  try {
    await connectDB();
    const {id} = params;
      const data = await Experience.find({professorId: id});
      return NextResponse.json({ success: true, data }, {status: 200});
    } catch (error) {
      return resError(error?.message)
    }
}

  
export async function PUT (req, {params}) {
  try {
    await connectDB();
    const authData = await userAuthGuard(req);
    if(!authData?.success){
      return resError(authData?.message);
    }
    const {id} = params;
    const body = await req.json();
    const {title, company, desc, from, to, link} = body;
    console.log(id);
    
    let exper = await Experience.findOne({_id: id});
    if(!exper){
      return resError(`${id} not found in database.`)
    }
    exper.title = title || exper.title;
    exper.desc = desc || exper.desc;
    exper.company = company || exper.company;
    exper.from = from || exper.from;
    exper.to = to;
    exper.link = link || exper.link;
    
    const updatedExper = await exper.save();

    return NextResponse.json({
      success: true, 
      message: `${updatedExper?.title} experience has been updated.`,
        data: updatedExper
      }, {status: 200})
      
    } catch (error) {
      return resError(error?.message)
    }
}


export async function POST (req, { params }) {
    try {
      await connectDB();
    const data = await userAuthGuard(req);
    if(!data?.success){
      return resError(data?.message);
    }
        const { id } = params;
        const body = await req.json();
        const {title, company, desc, from, to, link} = body;
        if(!title || !company || !from || !link){
          return resError("Please fill all fields.");
      }
      const experience = await Experience.create({
        title, company, desc, from, to, link, professorId: id
      })

    return NextResponse.json({ success: true, message: `${title} experience has been added.`, data: experience }, {status: 201});

    } catch (error) {
        return resError(error?.message)
    }
}


export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const authData = await userAuthGuard(req);
    if(!authData?.success){
      return resError(authData?.message);
    }
    const {id} = params;
    const data = await Experience.findOneAndDelete({_id: id});
    if(!data){
      return resError(`${id} not found in database.`)
    }
      return NextResponse.json({ success: true, message: `${data?.title} experience has been deleted.` }, {status: 200});
    } catch (error) {
      return resError(error?.message)
    }
}
