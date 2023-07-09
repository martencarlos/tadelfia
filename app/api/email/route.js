
import { NextResponse } from "next/server";
import { sendHtmlMail } from "@/lib/emailService";


export const POST = async ( req ) => {
    const data = await req.json();
   

    await sendHtmlMail(
        "martencarlos@gmail.com",
        "Tadelfia - Contact Form", //subject
        JSON.stringify(data)//content
      );

    return new NextResponse(JSON.stringify({ message: "received" }), { status: 200 });
}