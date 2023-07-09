
import { NextResponse } from "next/server";
import { sendContactForm } from "@/lib/emailService";


export const POST = async ( req ) => {
    const data = await req.json();
    
    await sendContactForm(
        "martencarlos@gmail.com",
        "Tadelfia - Contact Form", //subject
        JSON.stringify(data)//content
      );

    return new NextResponse(JSON.stringify({ message: "received" }), { status: 200 });
}