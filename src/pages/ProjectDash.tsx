import { useEffect, useState } from "react";
import { IProject } from "../types/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import Groups2Icon from '@mui/icons-material/Groups2';
import Task from "../components/Task";
import { makeRequest } from "../utils/api";
import { Types } from "mongoose";
import { Skeleton, Popover, Button } from "@mui/material";
import List from "../components/Lists";
import { useRecoilState } from 'recoil';
import { alertAtom } from "../atom/global";
import SideBar from "../components/SideBar";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { userAtom } from '../atom/user';

const ProjectDash = () => {
    const [project, setProject] = useState<IProject>();
    const { projectId } = useParams();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [alertState, setalertState] = useRecoilState(alertAtom);
    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();

    // For members popover
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // To fetch new update for user if user doesn't exist
    useEffect(() => {
        const getUserDetails = async () => {
            const res = await makeRequest("/user", "GET");
            if (res.data.user) {
                setUser(res.data.user)
                console.log("User updated!");
            }
            else navigate("/")
        }
        if (user.role === '') {
            getUserDetails();
        }
    }, [])

    // To get project data from backend
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await makeRequest("/project/" + projectId, "GET");
                if (res.data.project)
                    setProject(res.data.project);
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })
            }
        };
        getData();
    }, [projectId]);

    return (
        <div className="flex flex-row">
            <SideBar />
            <div className="w-full px-4 sm:px-6 lg:w-3/4">
                {/* Header */}
                <div className="flex h-14 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2"><i className="fa-solid fa-circle-arrow-left"></i> <span className="text-xs font-semibold underline">Jump to dashboard</span></Link>
                    {/* Members Popover */}
                    <div className="flex flex-wrap">
                        {user.role !== "user" && <Button variant="text" aria-describedby={id} onClick={handleClick} className="flex items-center gap-2 text-blue-500"><span className="hidden sm:block">Add User</span><PersonAddIcon /></Button>}
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
                        <Button aria-describedby={id} onClick={handleClick}>
                            <div className="flex items-center gap-2 text-blue-500"><span className="hidden md:text-md sm:block">Members</span><Groups2Icon /></div>
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
                        <div className="my-3 flex justify-between">
                            <h1 className="text-4xl font-bold"> {project.name} <span className="block mt-2 text-sm font-thin sm:inline"> Created By: @<Link to={"/user/" + project.createdBy.userId}>{project.createdBy.name}</Link> </span></h1>
                            {user.role !== "user" && <button className="text-md flex items-center"><EditIcon /> Edit</button>}
                        </div>
                        <div>
                            <span className="font-semibold">Description: </span>
                            {project.desc}
                        </div>
                        {/* Task History */}
                        <div className="border-2 min-h-fit my-4 py-4 p-2 md:p-4 rounded-lg flex flex-col gap-4">
                            <div className="w-full relative">
                                <h1 className="text-start md:text-center font-semibold text-xl inline-flex">Task History</h1>
                                {user.role !== "user" && <Button variant="text" className="text-blue-500 task-btn">Create Task</Button>}
                            </div>
                            <div className="flex gap-4 flex-col">
                                {project.tasks && project.tasks.length > 0 ? (
                                    project.tasks.map((task, i) => (
                                        <Task key={i} taskId={new Types.ObjectId(task.taskId)} projectId={new Types.ObjectId(projectId)} />
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center h-32 text-center text-gray-700">
                                        Currently no project are available. Tell you manager to add you in one.
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
