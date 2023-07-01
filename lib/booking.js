
// client calls

export function getAllBookings() {
    return fetch("/api/bookings").then((res) => res.json());
}

export function getYearBookingsFromVilla(year, villa) {
    return fetch(`/api/bookings/${villa}`).then((res) => res.json());
}

//server calls
export function serverGetAllBookings() {
    return fetch(process.env.NEXT_PUBLIC_HOST+"/api/bookings"
    , { next: { revalidate: 10 } }
    ).then((res) => res.json());
}

