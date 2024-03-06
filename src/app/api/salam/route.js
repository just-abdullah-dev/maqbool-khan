import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  return NextResponse.json({
    success: true,
    message: "Salam, DB Connected",
  });
}
