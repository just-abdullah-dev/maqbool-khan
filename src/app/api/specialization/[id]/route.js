import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Course from "@/models/course";
import Specialization from "@/models/specializations";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await Specialization.find({ professorId: id }).populate("courses");
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
    const body = await req.json();
    let { title, link, courses } = body;
    if (!title || !link) {
      return resError("Please fill all fields.");
    }
    let specia = await Specialization.create({
      title, link,
      professorId: id,
    });

    let coursesId = [];
    const promises = courses.map(async (course)=>{
      const newCourse = await Course.create({
        title: course.title, 
        link: course.link,
        parent: specia._id
      })
      coursesId.push(newCourse._id);
    });
    await Promise.all(promises);

    specia.courses = coursesId;
    const updatedSpecia = await specia.save();    

    return NextResponse.json(
      {
        success: true,
        message: `${updatedSpecia?.title} has been added.`,
        data: updatedSpecia,
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
    const body = await req.json();
    const { title, link } = body;

    let specia = await Specialization.findOne({ _id: id });
    if (!specia) {
      return resError(`${id} not found in database.`);
    }
    specia.title = title || specia.title;
    specia.link = link || specia.link;

    const updatedSpecia = await specia.save();

    return NextResponse.json(
      {
        success: true,
        message: `${updatedSpecia?.title} has been updated.`,
        data: updatedSpecia,
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
    const data = await Specialization.findOneAndDelete({ _id: id });
    if (!data) {
      return resError(`${id} not found in database.`);
    }
    await Course.deleteMany({parent: data?._id});
    return NextResponse.json(
      { success: true, message: `${data?.title} specialization has been deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
