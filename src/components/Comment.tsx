import { Link } from "react-router-dom";
import { commentType } from "../types/types";
import { calculateTime } from "../utils/calculateTime";
import { Skeleton } from "@mui/material";

interface commentProps {
    comments: commentType[]
}

const Comment: React.FC<commentProps> = ({ comments }) => {
    return (
        <>
            {comments ?
                (comments.map((comment, i) => (
                    <div key={i} className="mr-2">
                        <div className="mb-3">
                            <Link to={"/user/" + comment.userId} className="inline underline text-lg">@{comment.userName}</Link> <span className="text-xs text-gray-500 pl-2">{calculateTime(comment.timestamp) || ""}</span>
                        </div>
                        <div className="bg-gray-200 border-l-4 border-gray-400 p-5">{comment.comment}</div>
                    </div>
                ))
                ) : (
                    <Skeleton variant="rounded" height={70} />
                )}
        </>
    );
};

export default Comment;
