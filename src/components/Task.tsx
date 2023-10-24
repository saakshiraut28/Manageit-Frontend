import { useEffect, useState } from "react";
import { Stack, Chip, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { ITask } from "../types/types"
import { Types } from "mongoose";
import { makeRequest } from "../utils/api";
import { formatDate } from "../utils/formatDate";

interface TaskProps {
    taskId: Types.ObjectId;
    projectId: Types.ObjectId;
}

const Task: React.FC<TaskProps> = ({ taskId, projectId }) => {
    const [task, setTask] = useState<ITask>();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await makeRequest("/task/" + taskId, "GET")
                console.log(res.data.task);
                setTask(res.data.task);
            } catch (error) {
                console.error("Error fetching task data:", error);
            }
        };
        getData();
    }, [taskId]);

    return (
        <>
            {task ? (
                <Link
                    to={"/task/" + taskId}
                    className={`border-2 rounded-lg flex flex-col items-start gap-2 px-4 py-6 md:flex-row md:justify-between md:items-center ${task?.status === "completed" ? "bg-gray-200" : "bg-white"}`}
                >
                    <h1>{task?.name}</h1>
                    <Stack direction="row" spacing={1} className="flex flex-wrap gap-2">
                        <Chip variant="outlined" size="small" color="primary" label={"Assigned By: @" + task.assignedBy?.name} />
                        <Chip size="small" color="warning" variant="outlined" label={task.deadline ? "Deadline: " + formatDate(task.deadline) : "No Deadline"} />
                        <Chip size="small" color="success" label={task.status || "No status"} />
                    </Stack>
                </Link>
            ) : (
                <Skeleton variant="rounded" height={70} />
            )}
        </>
    );
};

export default Task;
