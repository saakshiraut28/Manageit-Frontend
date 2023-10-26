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
    projectId: Types.ObjectId
}

const DashTask: React.FC<Props> = ({ projectId }) => {
    const [project, setProject] = useState<IProject>();
    const [alertState, setalertState] = useRecoilState(alertAtom);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await makeRequest("/project/" + projectId, "GET");
                if (res.data?.project)
                    setProject(res.data.project);
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })
            }
        };
        getData();
    }, [projectId]);
    return (
        <>
            {
                // task ? (
                //     <Link
                //         to={"/task/" + taskId}
                //         className="border-2 rounded-lg flex flex-col gap-3 px-4 py-6 bg-white"
                //     >
                //         <h1 className="text-lg md:text-xl font-semibold">{task.name}</h1>
                //         <div>{task.desc}</div>
                //         <Stack direction="row" spacing={1} className="mt-2 flex flex-wrap gap-2">
                //             <Chip color="primary" label={task.assignedBy ? "Assigned By: @" + task.assignedBy.name : "No Assignee"} />
                //             <Chip color="warning" label={task.deadline ? "Deadline: " + formatDate(task.deadline) : "No Deadline"} />
                //             <Chip color="success" label={task.status || "No status"} />
                //         </Stack>
                //     </Link >
                // ) : (
                //     <Skeleton variant="rounded" height={70} />
                // )
            }
        </>
    )
}

export default DashTask
