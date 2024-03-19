import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Publications from "@/models/publications";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await Publications.find({ professorId: id });
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
    const body = await req.json();
    const { title, solo, members, link, year } = body;

    let publi = await Publications.findOne({ _id: id });
    if (!publi) {
      return resError(`${id} not found in database.`);
    }
    publi.title = title || publi.title;
    publi.members = members || publi.members;
    publi.link = link || publi.link;
    publi.year = year || publi.year;
    if(solo === "yes"){
      publi.solo = true;
    }else if(solo === "no"){
      publi.solo = false;
    }

    const updatedPubli = await publi.save();

    return NextResponse.json(
      {
        success: true,
        message: `${updatedPubli?.title} has been updated.`,
        data: updatedPubli,
      },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();
    const data = await userAuthGuard(req);
    if (!data?.success) {
      return resError(data?.message);
    }
    const { id } = params;
    const body = await req.json();
    let { title, solo, members, link, year } = body;
    if (!title || !link) {
      return resError("Please fill all fields.");
    }
    if(solo === "yes"){
      solo = true;
    }else if(solo === "no"){
      solo = false;
    }
    const publi = await Publications.create({
      title, solo, members, link, year,
      professorId: id,
    });

    return NextResponse.json(
      {
        success: true,

        message: `${publi?.title} has been added.`,
        data: publi,
      },
      { status: 201 }
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
    const data = await Publications.findOneAndDelete({ _id: id });
    if (!data) {
      return resError(`${id} not found in database.`);
    }
    return NextResponse.json(
      { success: true, message: `${data?.title} publication has been deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
