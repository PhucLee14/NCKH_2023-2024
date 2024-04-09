export function extractTime(dateString) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const day = padZero(date.getDay());
    const month = monthNames[date.getMonth()];
    const year = padZero(date.getFullYear());
    return `${hours}:${minutes} • ${month} ${day}.${year}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}
