import { useEffect, useState } from "react";
import { Stack, Chip, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { ITask } from "../types/types"
import { Types } from "mongoose";
import { makeRequest } from "../utils/api";
import { formatDate } from "../utils/formatDate";
import { useRecoilState } from 'recoil';
import { alertAtom } from "../atom/global";

interface TaskProps {
    taskId: Types.ObjectId;
    projectId: Types.ObjectId;
}

const Task: React.FC<TaskProps> = ({ taskId, projectId }) => {
    const [task, setTask] = useState<ITask>();
    const [alertState, setalertState] = useRecoilState(alertAtom);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await makeRequest("/task/" + taskId, "GET");
                if (res.data.task)
                    setTask(res.data.task);
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })
            }
        };
        getData();
    }, [taskId]);

    return (
        <>
            {task ? (
                <Link
                    to={"/task/" + taskId}
                    className={`border-2 rounded-lg flex flex-col items-start gap-2 px-4 py-6 md:flex-row md:justify-between md:items-center ${task.status === "Completed" ? "bg-gray-200" : "bg-white"}`}
                >
                    <h1>{task.name.length > 50 ? `${task.name.slice(0, 50)}...` : task.name}</h1>
                    <Stack direction="row" spacing={1} className="flex flex-wrap gap-2">
                        <Chip variant="outlined" size="small" color="primary" label={task.assignedBy ? "Assigned By: @" + task.assignedBy.name : "No Assignee"} />
                        <Chip size="small" color="warning" variant="outlined" label={task.deadline ? "Deadline: " + formatDate(task.deadline) : "No Deadline"} />
                        <Chip size="small" color={task.status === "Completed" ? "success" : "info"} label={task.status || "No status"} className="m-2" />
                    </Stack>
                </Link>
            ) : (
                <Skeleton variant="rounded" height={70} />
            )}
        </>
    );
};

export default Task;
