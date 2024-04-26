import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Course from "@/models/course";
import Specialization from "@/models/specializations";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError(authData?.message);
    }
    const { id } = params;
    const body = await req.json();
    let { title, link } = body;
    if (!title || !link) {
      return resError("Please fill all fields.");
    }
    let specia = await Specialization.findById(id);
    if (!specia) {
      return resError(`${id} was not found in database.`);
    }
    const course = await Course.create({
      title,
      link,
      parent: id,
    });
    specia.courses.push(course._id);
    const updatedSpecia = await specia.save();

    return NextResponse.json(
      {
        success: true,
        message: `Course ${title} has been added to ${updatedSpecia?.title}. Specialization.`,
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

    let course = await Course.findOne({ _id: id });
    if (!course) {
      return resError(`${id} not found in database.`);
    }
    course.title = title || course.title;
    course.link = link || course.link;

    const updatedCourse = await course.save();

    return NextResponse.json(
      {
        success: true,
        message: `Course ${updatedCourse?.title} has been updated.`,
        data: updatedCourse,
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
    const data = await Course.findOneAndDelete({ _id: id });
    if (!data) {
      return resError(`${id} not found in database.`);
    }
    await Course.deleteMany({ parent: data?._id });
    return NextResponse.json(
      { success: true, message: `${data?.title} course has been deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
