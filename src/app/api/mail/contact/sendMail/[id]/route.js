
import connectDB from "@/lib/db";
import ContactMails from "@/models/contactMails";
import Personal from "@/models/personal";
import resError from "@/utils/resError";
import { sendMail } from "@/utils/sendMail";
import { NextResponse } from "next/server";

async function sendMailToProfessor(email, clientName, developer, clientEmail, msg, subject){
  try {
      const message = `
      <br><b>Dear ${developer},</b>
      <br>${msg}
      <br>
      <br>Regards,
      <br>${clientName}
      <br>Email: ${clientEmail}`;

      await sendMail(email, `Salam! ${clientName} contacted you 🎉 | ${subject}`, message);
      return null;
  } catch (error) {
      console.error(error)
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await req.json();
    const {
      name,
      email,
      subject,
      message,
    } = body;

    if (!name || !subject || !message || !email) {
      return resError("Please fill all fields.");
    }

    const contact = await ContactMails.create({
      name,
      email,
      subject,
      body: message,
      professorId: id,
    });
    const professor = await Personal.findOne({ id }).select("-password");
    
    if (!professor) {
      return resError("Professor not found.");
    }

    const professorName = professor?.name?.first + " " + professor?.name?.last;
    
    await sendMailToProfessor( professor?.contact?.email, name, professorName, email, message, subject);

    return NextResponse.json(
      {
        success: true,
        message: `Thanks ${contact?.name} for contacting me. I will get back to you soon.`,
        data: contact,
      },
      { status: 201 }
    );
  } catch (error) {
    return resError(error?.message);
  }
}

