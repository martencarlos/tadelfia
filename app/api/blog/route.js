
import { NextResponse } from "next/server";
import { getAllPublishedPosts } from '@/lib/wordpressApi'

//force dynamic call to api instead of only at build time no matter what you put in the fetch as parameter
export const dynamic = 'force-dynamic' 
// export const revalidate = 10 

export const GET = async (req) => {
    console.log("api/blog called")

    // const res = await fetch("https://login.smoobu.com/api/reservations?pageSize=100", {
    //     method: "GET",
    //     headers: {
    //         "Api-Key": process.env.SMOOBU_API_KEY,
    //         "Cache-Control": "no-cache"
    //     },
    //   });
    // const data = await res.json();
    // const dates = data.bookings.map((booking) => {
    //     return {
    //         start: booking.arrival,
    //         end: booking.departure,
    //     }
    // })
    // console.log(data.bookings[0])
    // console.log(dates)
    // console.log(data.total_items)
    // console.log(data.page_size)
    // console.log(data.page_count)

    


    const allPosts = await getAllPublishedPosts()
    // console.log(allPosts)

    return new NextResponse(JSON.stringify(allPosts), { status: 200 });
}