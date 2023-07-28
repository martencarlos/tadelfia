
import { NextResponse } from "next/server";
import dataJson from "@/app/villas/[id]/data.json";


export const POST = async ( req ) => {
    console.log("api/priceAndNights/route called")
    const {villa, checkin, checkout} = await req.json();
    
    const villaInfoObject = dataJson.find((item) => item.villa === villa)
    const startDate = new Date(checkin).toISOString().split('T')[0]
    const endDate = new Date(checkout).toISOString().split('T')[0]

    const res = await fetch(`https://login.smoobu.com/api/rates?apartments[]=${villaInfoObject.apartmentId}&start_date=${startDate}&end_date=${endDate}`, {
        method: "GET",
        headers: {
            "Api-Key": process.env.NEXT_PUBLIC_SMOOBU_API_KEY,
            "Cache-Control": "no-cache"
        },
      });
    const data = await res.json();
    // console.log(data["data"][villaInfoObject.apartmentId])
    const array = []
    for(let i in data["data"][villaInfoObject.apartmentId])
        array.push([i, data["data"][villaInfoObject.apartmentId][i]]);

    return new NextResponse(JSON.stringify(array), { status: 200 });
}