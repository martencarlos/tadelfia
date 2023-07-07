
import { NextResponse } from "next/server";
import { sendTextMail } from "@/lib/emailService";


export const POST = async ( req ) => {
    const data = await req.json();
   

    await sendTextMail(
        "martencarlos@gmail.com",
        "Tadelfia - Contact Form", //subject
        data.messageToHost//content
      );

    return new NextResponse(JSON.stringify({ message: "received" }), { status: 200 });
}