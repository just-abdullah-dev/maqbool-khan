import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Certification from "@/models/certifications";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const file = formData.getAll("files")[0];
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `./public/uploads/${fileName}`;

    await pump(file.stream(), fs.createWriteStream(filePath));
    return NextResponse.json({ success: true, data: fileName });
  } catch (e) {
    return resError(e?.message);
  }
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await Certification.find({ professorId: id });
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
    if (solo === "yes") {
      publi.solo = true;
    } else if (solo === "no") {
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
      {
        success: true,
        message: `${data?.title} publication has been deleted.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
