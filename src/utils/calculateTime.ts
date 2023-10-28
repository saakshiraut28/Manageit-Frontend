export const calculateTime = (timestamp: Date) => {
    if (timestamp === undefined) {
        return "";
    }
    const currentTime = new Date();
    const commentTime = new Date(timestamp);
    const difference = (currentTime.getTime() - commentTime.getTime()) / 60000; // Difference in minutes
    if (difference < 1) {
        return "just now";
    } else if (difference < 60) {
        return `${Math.round(difference)} min ago`;
    } else if (difference < 1440) {
        return `${Math.round(difference / 60)} hours ago`;
    } else {
        return `${Math.round(difference / 1440)} days ago`;
    }
};