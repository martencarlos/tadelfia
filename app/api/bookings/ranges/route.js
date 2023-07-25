import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";

//force dynamic call to api instead of only at build time no matter what you put in the fetch as parameter
export const dynamic = 'force-dynamic' 
// export const revalidate = 10 

export const GET = async (req) => {
    console.log("api/bookings/ranges called")

    // await dbConnect();
    // const allBookings = await Booking.find({},'accomodation.villa accomodation.checkin accomodation.checkout');
    
    const res = await fetch("https://login.smoobu.com/api/reservations?pageSize=100", {
        method: "GET",
        headers: {
            "Api-Key": process.env.NEXT_PUBLIC_SMOOBU_API_KEY,
            "Cache-Control": "no-cache"
        },
      });
    const data = await res.json();

    const dates = data.bookings.map((booking) => {
        // const parts = booking.apartment.name.split(" - ");
        // const apartment = parts[parts.length-1]
        const apartment = booking.apartment.name
        return {
            accomodation:{
                villa: apartment,
                checkin: booking.arrival,
                checkout: booking.departure,
            }

        }
    })
    // console.log(data.bookings[0])
    // console.log(dates)
    // console.log(data.total_items)
    // console.log(data.page_size)
    // console.log(data.page_count)
    
    // const parts = data.bookings[0].apartment.name.split(" - ");
    // const apartment = parts[parts.length-1]
    // console.log(apartment)

 
    return new NextResponse(JSON.stringify(dates), { status: 200 });
}