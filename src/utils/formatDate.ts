export const formatDate = (dateInput: Date) => {
    const date = new Date(dateInput);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthName = months[monthIndex];

    const formattedDate = `${day} ${monthName}, ${year.toString()}`;
    return formattedDate;
}