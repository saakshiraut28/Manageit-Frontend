import { useEffect, useState } from "react";
import { Stack, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { ITask } from "../types/types"
import axios from "axios";
import { Types } from "mongoose";

interface TaskProps {
    taskId: Types.ObjectId;
    projectId: Types.ObjectId;
}

const Task: React.FC<TaskProps> = ({ taskId, projectId }) => {
    const [task, setTask] = useState<ITask>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const res = await axios.get(`${process.env.REACT_SERVER_URL}/project/${projectId}/task/${taskId}`);
                // setTask(res.data);
            } catch (error) {
                console.error("Error fetching task data:", error);
            }
        };
        fetchData();
    }, [taskId]);

    return (
        <Link
            to="/:taskId"
            className={`border-2 rounded-lg flex flex-col items-start gap-2 px-4 py-6 md:flex-row md:justify-between md:items-center ${task?.status === "completed" ? "bg-gray-200" : "bg-white"}`}
        >
            <h1>Bug: Revoke the unwanted text in the header</h1>
            <Stack direction="row" spacing={1} className="flex flex-wrap gap-2">
                <Chip variant="outlined" size="small" color="primary" label="Assigned By: @Mayank" />
                <Chip label="Deadline: 14 Jan 2024" size="small" color="warning" variant="outlined" />
                <Chip size="small" color="success" label="In Progress" />
            </Stack>
        </Link>
    );
};

export default Task;
