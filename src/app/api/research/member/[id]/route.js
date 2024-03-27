import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Research from "@/models/research";
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
    let { researchId, member } = body;
    if (!researchId || !member) {
      return resError("Research ID is required. OR No member data was found.");
    }
    let research = await Research.findById({_id: researchId});
    research.member = research.member.concat(member);
    const updatedResearch = await research.save();
    return NextResponse.json(
      {
        success: true,
        message: `Member data of ${id} has been updated.`,
        data: updatedResearch,
      },
      { status: 200 }
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
    const { memberIndex, memberBody } = body;

    let research = await Research.findOne({ _id: id });
    if (!research) {
      return resError(`${id} not found in database.`);
    }
    research.member[memberIndex].title = memberBody.title || research.member[memberIndex]?.title;
    
    research.member[memberIndex].link = memberBody.link || research.member[memberIndex]?.link;

    const updatedResearch = await research.save();

    return NextResponse.json(
      {
        success: true,
        message: `${
          updatedResearch.member[memberIndex]?.title} has been updated.`,
        data: updatedResearch,
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
    const body = await req.json();
    const { memberIndex } = body;
    
    let research = await Research.findOne({ _id: id });
    if (!research) {
      return resError(`${id} not found in database.`);
    }
    research.member.splice(memberIndex, 1);

    const updatedResearch = await research.save();

    return NextResponse.json(
      { 
        success: true, 
        message: `Member has been removed.`,
        data: updatedResearch },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
