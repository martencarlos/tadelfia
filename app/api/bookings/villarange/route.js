import { NextResponse } from "next/server";

//force dynamic call to api instead of only at build time no matter what you put in the fetch as parameter
export const dynamic = 'force-dynamic' 
// export const revalidate = 10 

export const POST = async (req) => {
    console.log("api/bookings/villarange called")
    const {apartmentId, startDate, endDate} = await req.json();
    console.log(apartmentId, startDate, endDate)

    const res = await fetch(`https://login.smoobu.com/api/reservations?apartmentId=${apartmentId}&from=${startDate}&to=${endDate}&showCancellation=0`, {
        method: "GET",
        headers: {
            "Api-Key": process.env.NEXT_PUBLIC_SMOOBU_API_KEY,
            "Cache-Control": "no-cache"
        },
      });
    const reservations = await res.json();
    // console.log(reservations)

    return new NextResponse(JSON.stringify(reservations), { status: 200 });
}