


// client calls

export function getAllPosts() {
    return fetch("/api/blog", { cache: 'no-store' }).then((res) => res.json());
}

//server calls
// export function serverGetAllPosts() {
//     return fetch(process.env.NEXT_PUBLIC_HOST+"/api/blog"
//     , { cache: 'no-store' }
//     ).then((res) => res.json());
// }