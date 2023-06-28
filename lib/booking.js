
export function getAllBookings() {
    return fetch("/api/bookings").then((res) => res.json());
}

export function getYearBookingsFromVilla(year, villa) {
    return fetch(`/api/bookings/${villa}`).then((res) => res.json());
}

