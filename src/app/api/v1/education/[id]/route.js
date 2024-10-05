import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Education from "@/models/education";
import getSearchParams from "@/utils/getSearchParams";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  try {
    await connectDB();
    const {id} = params;
      
    const searchParams = getSearchParams(req);
    const showOnHome = searchParams.get("showOnHome");

    let query = {professorId: id};
    if (showOnHome === "yes") {
      query = { professorId: id, showOnHome: true };
    }

    const data = await Education.find(query);

    if (!data) {
      return resError(`No education was found.`);
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
    const { id } = params;
    const body = await req.json();
    const { degree, institute, desc, from, to, field, country, showOnHome } = body;
    
    let edu = await Education.findOne({_id: id});
    if(!edu){
      return resError(`${id} not found in database.`)
    }
    edu.degree = degree || edu.degree;
    edu.desc = desc || edu.desc;
    edu.institute = institute || edu.institute;
    edu.from = from || edu.from;
    edu.to = to;
    edu.field = field || edu.field;
    edu.country = country || edu.country;
    
    if (showOnHome === "yes") {
      edu.showOnHome = true;
    } else if (showOnHome === "no") {
      edu.showOnHome = false;
    }

    const updatedEdu = await edu.save();

    return NextResponse.json({
      success: true,
      message: `${updatedEdu?.degree} has been updated.`,
        data: updatedEdu
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
        const {degree, institute, desc, from, to, field, country, showOnHome } = body;
        if(!degree || !institute || !from || !field){
          return resError("Please fill all fields.");
      }
      const edu = await Education.create({
        degree, institute, desc, from, to, field, professorId: id, country, 
        showOnHome: showOnHome === "yes" ? true : false,
      })

    return NextResponse.json({ success: true,
      message: `${degree} education has been added.`, data: edu }, {status: 201});

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
    const data = await Education.findOneAndDelete({_id: id});
    if(!data){
      return resError(`${id} not found in database.`)
    }
      return NextResponse.json({ success: true, message: `${data?.degree} education has been deleted.` }, {status: 200});
    } catch (error) {
      return resError(error?.message)
    }
}
