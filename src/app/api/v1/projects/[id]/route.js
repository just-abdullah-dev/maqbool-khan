import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Project from "@/models/projects";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await Project.find({ professorId: id });
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
    let {
      title,
      isCompleted,
      institute,
      link,
      from,
      to,
      desc,
      responsibilities,
    } = body;
    if (!title || !link || !from) {
      return resError("Please fill all fields.");
    }
    if (isCompleted === "yes") {
      isCompleted = true;
    } else if (isCompleted === "no") {
      isCompleted = false;
    }
    const project = await Project.create({
      title,
      isCompleted,
      institute,
      link,
      from,
      to,
      desc,
      responsibilities,
      professorId: id,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Project ${project?.title} has been added.`,
        data: project,
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
    const {
      title,
      isCompleted,
      institute,
      link,
      from,
      to,
      desc,
      responsibilities,
    } = body;

    let project = await Project.findOne({ _id: id });
    if (!project) {
      return resError(`${id} not found in database.`);
    }
    project.title = title || project.title;
    project.desc = desc || project.desc;
    project.link = link || project.link;
    project.from = from || project.from;
    project.to = to || project.to;
    project.responsibilities = responsibilities || project.responsibilities;
    if (isCompleted === "yes") {
      project.isCompleted = true;
    } else if (isCompleted === "no") {
      project.isCompleted = false;
    }

    const updatedProject = await project.save();

    return NextResponse.json(
      {
        success: true,
        message: `Project ${updatedProject?.title} has been updated.`,
        data: updatedProject,
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
    const data = await Project.findOneAndDelete({ _id: id });
    if (!data) {
      return resError(`Project ${id} was not found in database.`);
    }
    return NextResponse.json(
      { success: true, message: `${data?.title} project has been deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
