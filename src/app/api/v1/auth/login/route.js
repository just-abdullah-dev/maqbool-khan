import connectDB from "@/lib/db";
import Personal from "@/models/personal";
import resError from "@/utils/resError";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await connectDB();
        const body = await req.json();
        const { id, password } = body;
        const user = await Personal.findOne({ id });
        if (!user) {
          return resError(`${id} was not found.`);
        }
        if (await user.comparePassword(password)) {
          const user2 = await Personal.findOne({ id }).select("-password");
          return NextResponse.json({
            success: true,
            message: "Logged In Successfully.",
            data: { ...user2?._doc, token: await user.generateJWT() },
          });
        }else{
          return resError("Password is incorrect.");
        }
    } catch (error) {
        return resError(error?.message);
    }
}
