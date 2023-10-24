import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input, Stack, Chip, Button, useStepContext, Skeleton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import Comment from "../components/Comment";
import { makeRequest } from "../utils/api";
import { ITask, commentType, userType } from "../types/types";
import { formatDate } from "../utils/formatDate";
import { Types } from "mongoose";
import { useRecoilState } from 'recoil';
import { alertAtom } from "../atom/global";
import SideBar from "../components/SideBar";

const TaskPage = () => {
    const [comment, setComment] = useState("");
    const [task, setTask] = useState<ITask>();
    const { taskId } = useParams();
    const [alertState, setalertState] = useRecoilState(alertAtom);

    const sendComment = async () => {
        const commentBody = {
            userId: new Types.ObjectId("653587e58931b3d02a955ed5"),
            userName: "user",
            comment: comment
        };
        const response = await makeRequest(`/task/${taskId}/comment`, "POST", commentBody);
        setComment("");
        if (response && response.status === 200) {
            console.log("New Comment Response:", response.data);
            setalertState({ open: true, text: response.data.msg, eventType: "success" })
        } else {
            setalertState({ open: true, text: response.data.msg, eventType: "error" })
        }
    };

    const assignees = (assignees: userType[]) => {
        const combinedNames = assignees.map(user => "@" + user.name).join(', ');
        return combinedNames;
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await makeRequest("/task/" + taskId, "GET")
                console.log(res.data.task);
                setTask(res.data.task);
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })
            }
        };
        getData();
    }, [taskId]);

    return (
        <div className="flex flex-row">
            <SideBar />
            {/* TaskPage */}
            <div className="w-full px-4 mb-10 sm:px-6 lg:w-3/4">
                {/* Header */}
                <div className="flex h-14 items-center">
                    <Link to="/" className="flex items-center gap-2"><i className="fa-solid fa-circle-arrow-left"></i> <span className="text-xs font-semibold underline">Jump to dashboard</span></Link>
                </div>
                {/* Task Details */}
                {task ? (
                    <div className="flex flex-col gap-4">
                        <div className="my-3">
                            <h1 className="text-4xl font-bold mb-2"> {task.name} <span className="block sm:inline">
                                <Chip variant="outlined" size="small" color="primary" label={"Assigned By: @" + task.assignedBy.name} className="m-2" />
                                <Chip size="small" color="warning" variant="outlined" label={task.deadline ? "Deadline: " + formatDate(task.deadline) : "No Deadline"} className="m-2" />
                                <Chip size="small" color="success" label={task.status || "No status"} className="m-2" />
                            </span>
                            </h1>
                            <Stack>
                                <Chip color="secondary" label={"Asssigned To: " + assignees(task.assignedTo)} className="m-2 w-fit" />
                            </Stack>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>
                                <span className="font-semibold">Description: </span>
                                {task.desc}
                            </div>
                            <div className="text-gray-500 text-sm">
                                <span className="font-semibold">Created By: @</span>
                                <Link to={"/user/" + task.createdBy.userId}>{task.createdBy.name}</Link>
                            </div>
                            <div className="text-gray-500 text-sm">
                                <span className="font-semibold">Created On: </span>
                                {formatDate(task.date)}
                            </div>
                        </div>

                        {/* Comments History */}
                        <div className="border-2 min-h-fit my-4 py-4 p-2 md:p-4 rounded-lg flex flex-col gap-4">
                            <Chip icon={<CommentIcon />} label="Comments" className="w-40 text-xl" />
                            <div className="flex gap-4 flex-col h-96 md:h-72 overflow-y-scroll">
                                {task.comments && task.comments.length > 0 ? (
                                    <Comment comments={task.comments} />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-center text-gray-700">
                                        No comments on this task. Be the first one to comment!
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <Input placeholder="Type your message...." required={true} value={comment} onChange={(e) => setComment(e.target.value)} className="w-full px-2 pr-12 -mr-16" />
                                <Button endIcon={<SendIcon />} type="button" disabled={!comment} onClick={sendComment} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="rectangular" height={100} className="mb-2" />
                        <Skeleton variant="rounded" height={400} />
                    </>
                )}
            </div>
        </div>
    )
}

export default TaskPage;
