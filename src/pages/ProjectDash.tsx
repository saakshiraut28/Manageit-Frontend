import axios from "axios";
import { useEffect, useState } from "react";
import { IProject } from "../types/types";
import { Link, useParams } from "react-router-dom";
import Groups2Icon from '@mui/icons-material/Groups2';
import Task from "../components/Task";
import { makeRequest } from "../utils/api";
import { Types } from "mongoose";
import { Skeleton, Popover, Button } from "@mui/material";
import List from "../components/Lists";
import { useRecoilState } from 'recoil';
import { alertAtom } from "../atom/global";

const ProjectDash = () => {
    const [project, setProject] = useState<IProject>();
    const { projectId } = useParams();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [alertState, setalertState] = useRecoilState(alertAtom);

    // For members popover
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // To get project data from backend
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await makeRequest("/project/" + projectId, "GET");
                setProject(res.data.project);
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })
            }
        };
        getData();
    }, [projectId]);

    return (
        <div className="flex flex-row">
            <div className="sidebar md:w-1/4"></div>
            <div className="w-full px-4 sm:px-6 md:w-3/4">
                {/* Header */}
                <div className="flex h-14 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2"><i className="fa-solid fa-circle-arrow-left"></i> <span className="text-xs font-semibold underline">Jump to dashboard</span></Link>
                    {/* Members Popover */}
                    <div>
                        <Button aria-describedby={id} onClick={handleClick}>
                            <div className="flex items-center gap-2 text-black"><span className="text-xs font-semibold underline">Members</span><Groups2Icon /></div>
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <List members={project?.users} />
                        </Popover>
                    </div>
                </div>
                {/* Project Details */}
                {project ? (
                    <div className="flex flex-col gap-4">
                        <div className="my-3">
                            <h1 className="text-4xl font-bold"> {project.name} <span className="block mt-2 text-sm font-thin sm:inline"> Created By: @<Link to={"/user/" + project.createdBy.userId}>{project.createdBy.name}</Link> </span></h1>
                        </div>
                        <div>
                            <span className="font-semibold">Description: </span>
                            {project.desc}
                        </div>
                        {/* Task History */}
                        <div className="border-2 min-h-fit my-4 py-4 p-2 md:p-4 rounded-lg flex flex-col gap-4">
                            <h1 className="text-center font-semibold text-xl">Task History</h1>
                            <div className="flex gap-4 flex-col">
                                {project.tasks && project.tasks.length > 0 ? (
                                    project.tasks.map((taskId, i) => (
                                        <Task key={i} taskId={taskId} projectId={new Types.ObjectId(projectId)} />
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center h-32 text-center text-gray-700">
                                        Currently no Tasks are available in the project. Create one and keep a check on your progress.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Skeleton variant="text" height={60} sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="rectangular" height={80} className="mb-2" />
                        <Skeleton variant="rounded" height={400} />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProjectDash;
