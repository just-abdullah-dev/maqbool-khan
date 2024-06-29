import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Project from "@/models/projects";
import getSearchParams from "@/utils/getSearchParams";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const searchParams = getSearchParams(req);
    const showOnHome = searchParams.get("showOnHome");

    let query;
    if (showOnHome === "yes") {
      query = { professorId: id, showOnHome: true };
    }

    const data = await Project.find(query);

    if (!data) {
      return resError(`No project was found.`);
    }

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
      responsibilities, showOnHome
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
      showOnHome: showOnHome === "yes" ? true : false,
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
      responsibilities, showOnHome
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
    project.institute = institute || project.institute;
    project.responsibilities = responsibilities || project.responsibilities;

    if (isCompleted === "yes") {
      project.isCompleted = true;
    } else if (isCompleted === "no") {
      project.isCompleted = false;
    }

    if (showOnHome === "yes") {
      project.showOnHome = true;
    } else if (showOnHome === "no") {
      project.showOnHome = false;
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
