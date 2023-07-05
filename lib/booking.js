
// client calls

export function getAllBookings() {
    return fetch("/api/bookings").then((res) => res.json());
}

export function getAllBookingRanges() {
    return fetch("/api/bookings/ranges").then((res) => res.json());
}


export function getYearBookingsFromVilla(year, villa) {
    return fetch(`/api/bookings/${villa}`).then((res) => res.json());
}

//server calls
export function serverGetAllBookings() {
    return fetch(process.env.NEXT_PUBLIC_HOST+"/api/bookings"
    , { cache: 'no-store' }
    ).then((res) => res.json());
}

