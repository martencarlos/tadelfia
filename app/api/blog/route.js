
// import { NextResponse } from "next/server";
// import { getAllPublishedPosts } from '@/lib/wordpressApi'

// //force dynamic call to api instead of only at build time no matter what you put in the fetch as parameter
// // export const dynamic = 'force-dynamic' 
// // export const revalidate = 10 

// export const GET = async (req) => {
//     console.log("api/blog called")

//     const allPosts = await getAllPublishedPosts()
//     // console.log(allPosts)

//     return new NextResponse(JSON.stringify(allPosts), { status: 200 });
// }