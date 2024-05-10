import connectDB from "@/lib/db";
import userAuthGuard from "@/middleware/userAuth";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const authData = await userAuthGuard(req);
    if (!authData?.success) {
      return resError("Session Expired - Please Login Again");
    }
    return NextResponse.json(
      {
        success: true,
        message: `Token is Valid`,
      }
    );
  } catch (error) {
    return resError(error?.message);
  }
}

