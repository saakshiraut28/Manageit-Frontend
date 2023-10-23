import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { commentType } from "../types/types";

interface commentProps {
    comment: commentType
}

const Comment: React.FC<commentProps> = ({ comment }) => {
    const [timeAgo, setTimeAgo] = useState("");

    // Calculate time to show with each comment
    const calculateTime = (timestamp: Date) => {
        const currentTime = new Date();
        const commentTime = new Date(timestamp);
        const difference = (currentTime.getTime() - commentTime.getTime()) / 60000; // Difference in minutes
        if (difference < 1) {
            setTimeAgo("just now");
        } else if (difference < 60) {
            setTimeAgo(`${Math.round(difference)} min ago`);
        } else if (difference < 1440) {
            setTimeAgo(`${Math.round(difference / 60)} hours ago`);
        } else {
            setTimeAgo(`${Math.round(difference / 1440)} days ago`);
        }
    };

    useEffect(() => {
        calculateTime(comment.timestamp);
    }, [comment.timestamp]);

    return (
        <div className="comment">
            <div className="mb-3">
                <Link to="/userId" className="inline underline text-lg">@Mayank</Link> <span className="text-xs text-gray-500 pl-2">3 min ago</span>
            </div>
            <div className="bg-gray-200 border-l-4 border-gray-400 p-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. beatae reprehenderit reiciendis quia porro commodi iure excepturi dolores facere sint perferendis, eius architecto?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, voluptatum!</div>
        </div>
    );
};

export default Comment;
