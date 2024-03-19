import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Skills from "@/models/skills";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await Skills.find({ professorId: id });
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
    const { title, items } = body;

    let skill = await Skills.findOne({ _id: id });
    if (!skill) {
      return resError(`${id} not found in database.`);
    }
    skill.title = title || skill.title;
    skill.items = items || skill.items;

    const updatedSkill = await skill.save();

    return NextResponse.json(
      {
        success: true,
        message: `${updatedSkill?.title} has been updated.`,
        data: updatedSkill,
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
    const { title, items } = body;
    if (!title) {
      return resError("Please fill all fields.");
    }
    const skill = await Skills.create({
      title,
      items,
      professorId: id,
    });

    return NextResponse.json(
      {
        success: true,

        message: `${skill?.title} has been added.`,
        data: skill,
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
    const data = await Skills.findOneAndDelete({ _id: id });
    if (!data) {
      return resError(`${id} not found in database.`);
    }
    return NextResponse.json(
      { success: true, message: `${data?.title} skill has been deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
