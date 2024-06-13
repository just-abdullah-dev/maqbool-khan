import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import Personal from "@/models/personal";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError(authData?.message);
    }
    const { id } = params;
    const body = await req.json();
    const { oldPassword, newPassword } = body;

    let user = await Personal.findOne({ id });
    if (!user) {
      return resError(`${id} was not found.`);
    }
    if (await user.comparePassword(oldPassword)) {
      user.password = newPassword;
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Password has been changed successfully."
      });
    }else{
      return resError("Old Password is incorrect.");
    }   
  } catch (error) {
    return resError(error?.message);
  }
}
