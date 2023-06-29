import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";

export const GET = async (request) => {

    await dbConnect();
    const allBookings = await Booking.find({});
  

    return new NextResponse(JSON.stringify(allBookings), { status: 200 });
}