import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import ContactMails from "@/models/contactMails";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try { 
    await connectDB();
    const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError(authData?.message);
    }
    const { id } = params;
    const data = await ContactMails.find({ professorId: id });
    return NextResponse.json({ success: true, data }, { status: 200 });
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
    const data = await ContactMails.findOneAndDelete({ _id: id });
    if (!data) {
      return resError(`Mail ${id} was not found in database.`);
    }
    return NextResponse.json(
      { success: true, message: `${data?.subject} mail has been deleted.` },
      { status: 200 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}
