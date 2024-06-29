import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Experience from "@/models/experience";
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

    const data = await Experience.find(query);

    if (!data) {
      return resError(`No experience was found.`);
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
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
    const { title, company, desc, from, to, link, showOnHome } = body;

    let exper = await Experience.findOne({ _id: id });
    if (!exper) {
      return resError(`${id} not found in database.`);
    }
    exper.title = title || exper.title;
    exper.desc = desc || exper.desc;
    exper.company = company || exper.company;
    exper.from = from || exper.from;
    exper.to = to;
    exper.link = link || exper.link;

    if (showOnHome === "yes") {
      exper.showOnHome = true;
    } else if (showOnHome === "no") {
      exper.showOnHome = false;
    }

    const updatedExper = await exper.save();

    return NextResponse.json(
      {
        success: true,
        message: `${updatedExper?.title} experience has been updated.`,
        data: updatedExper,
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
    const { title, company, desc, from, to, link, showOnHome } = body;
    if (!title || !company || !from || !link) {
      return resError("Please fill all fields.");
    }
    const experience = await Experience.create({
      title,
      company,
      desc,
      from,
      to,
      link,
      professorId: id,
      showOnHome: showOnHome === "yes" ? true : false,
    });

    return NextResponse.json(
      {
        success: true,
        message: `${title} experience has been added.`,
        data: experience,
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
    const data = await Experience.findOneAndDelete({ _id: id });
    if (!data) {
      return resError(`${id} not found in database.`);
    }
    return NextResponse.json(
      { success: true, message: `${data?.title} experience has been deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
