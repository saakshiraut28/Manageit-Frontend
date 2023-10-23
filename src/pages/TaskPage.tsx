import { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Stack, Chip, Button } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import Comment from "../components/Comment";

const TaskPage = () => {
    const [comments, setCommments] = useState(true);
    const [comment, setComment] = useState("");

    const sendComment = () => {
        console.log(comment);
        setComment("");
    }

    return (
        <div className="flex flex-row">
            <div className="sidebar md:w-1/4"></div>
            <div className="w-full px-4 sm:px-6 md:w-3/4">
                {/* Header */}
                <div className="flex h-14 items-center">
                    <Link to="/" className="flex items-center gap-2"><i className="fa-solid fa-circle-arrow-left"></i> <span className="text-xs font-semibold underline">Jump to dashboard</span></Link>
                </div>
                {/* Project Details */}
                <div className="flex flex-col gap-4">
                    <div className="my-3">
                        <h1 className="text-4xl font-bold mb-2"> Task Title <span className="block sm:inline">
                            <Chip variant="outlined" size="small" color="primary" label="Assigned By: @Mayank" className="m-2" />
                            <Chip label="Deadline: 14 Jan 2024" size="small" color="warning" variant="outlined" className="m-2" />
                            <Chip size="small" color="success" label="In Progress" className="m-2" />
                        </span>
                        </h1>
                        <Stack>
                            <Chip color="secondary" label="Assigned To: @Mayank" className="m-2 w-fit" />
                        </Stack>
                    </div>
                    <div>
                        <span className="font-semibold">Description: </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eaque laborum, tenetur, soluta ipsam beatae est a reprehenderit delectus ex quisquam illo
                        cumque doloribus repudiandae nemo ut laudantium dolorem obcaecati quas recusandae maxime. Dolor facilis iste nulla hic autem provident. Doloribus expedita inventore saepe quia,
                        fuga repellendus incidunt vitae ducimus?
                    </div>
                    {/* Comments History */}
                    <div className="border-2 min-h-fit my-4 py-4 p-2 md:p-4 rounded-lg flex flex-col gap-4">
                        <Chip icon={<CommentIcon />} label="Comments" className="w-40" />
                        <div className="flex gap-4 flex-col h-96 md:h-72 overflow-y-scroll">
                            {comments ?
                                <>
                                    {/* <Comment comment="" /> */}
                                </>
                                :
                                <div className="flex items-center justify-center h-full text-center text-gray-700">
                                    No comments on this task. Be the first one to comment!
                                </div>
                            }
                        </div>
                        <div className="">
                            <Input placeholder="Type your message...." required={true} value={comment} onChange={(e) => setComment(e.target.value)} className="w-full px-2 pr-12 -mr-16" />
                            <Button endIcon={<SendIcon />} type="button" disabled={!comment} onClick={sendComment} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskPage;
