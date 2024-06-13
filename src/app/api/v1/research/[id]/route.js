import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Research from "@/models/research";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";
import { object } from "zod";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await Research.find({ professorId: id });
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
    // member means subschema & members means simple object 
    let { interest, reviewer, organizationChair, sessionChair, member, members } = body;
    if (!interest) {
      return resError("Please enter your areas of interest.");
    }
    const research = await Research.create({
      interest,
      reviewer,
      organizationChair,
      member,
      sessionChair,
      professorId: id,
      members
    });

    return NextResponse.json(
      {
        success: true,
        message: `Research data has been added.`,
        data: research,
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
    const { interest, reviewer, organizationChair, sessionChair, members } = body;

    let research = await Research.findOne({ _id: id });
    if (!research) {
      return resError(`${id} not found in database.`);
    }
    research.interest = interest || research.interest;
    research.reviewer = reviewer || research.reviewer;
    research.organizationChair =
      organizationChair || research.organizationChair;
    research.sessionChair = sessionChair || research.sessionChair;
    research.members = members || research.members;

    const updatedResearch = await research.save();

    return NextResponse.json(
      {
        success: true,
        message: `Research data has been updated.`,
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
    const data = await Research.findOneAndDelete({ _id: id });
    if (!data) {
      return resError(`${id} not found in database.`);
    }
    return NextResponse.json(
      { success: true, message: `Research data has been deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
