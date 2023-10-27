import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Chip } from "@mui/material";
import { Skeleton } from "@mui/material";
import { IProject, ITask } from "../types/types";
import { Types } from "mongoose";
import { makeRequest } from "../utils/api";
import { useRecoilState } from 'recoil';
import { alertAtom } from "../atom/global";
import { formatDate } from "../utils/formatDate";

interface Props {
    taskId: Types.ObjectId
}

const DashTask: React.FC<Props> = ({ taskId }) => {
    const [task, setTask] = useState<ITask>();
    const [alertState, setalertState] = useRecoilState(alertAtom);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await makeRequest("/task/" + taskId, "GET");

                if (res.data?.task) {
                    setTask(res.data.task);

                }
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })
            }
        };
        getData();
    }, [taskId]);

    return (
        <>
            {
                task ? (
                    <Link
                        to={"/task/" + taskId}
                        className="border-2 rounded-lg flex flex-col gap-3 px-4 py-6 bg-white"
                    >
                        <h1 className="text-lg md:text-xl font-semibold">{task.name.length > 50 ? `${task.name.slice(0, 50)}...` : task.name}</h1>
                        <div>{task.desc.length > 100 ? `${task.desc.slice(0, 100)}...` : task.desc}</div>
                        <Stack direction="row" spacing={1} className="mt-2 flex flex-wrap gap-2">
                            <Chip color="primary" label={task.assignedBy ? "Assigned By: @" + task.assignedBy.name : "No Assignee"} />
                            <Chip color="error" label={task.deadline ? "Deadline: " + formatDate(task.deadline) : "No Deadline"} />
                            <Chip color={task.status === "Completed" ? "success" : "info"} label={task.status || "No status"} className="m-2" />
                        </Stack>
                    </Link >
                ) : (
                    <Skeleton variant="rounded" height={100} />
                )
            }
        </>
    )
}

export default DashTask
