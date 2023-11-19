import { useEffect, useState } from "react";
import { IProject, userType } from "../types/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import Groups2Icon from '@mui/icons-material/Groups2';
import Task from "../components/Task";
import { makeRequest } from "../utils/api";
import { Types } from "mongoose";
import { Skeleton, Popover, Button, List, ListItem, ListItemButton, ListItemText, Modal, Tooltip } from "@mui/material";
import Lists from "../components/Lists";
import { useRecoilState } from 'recoil';
import { alertAtom } from "../atom/global";
import SideBar from "../components/SideBar";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { userAtom } from '../atom/user';
import TaskModal from "../components/TaskModal";
import EditProjectModal from "../components/EditProjectModal";
import OrgSidebar from "../components/OrgSidebar";

const ProjectDash = () => {
    const [project, setProject] = useState<IProject>();
    const { projectId } = useParams();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [alertState, setalertState] = useRecoilState(alertAtom);
    const [user, setUser] = useRecoilState(userAtom);
    const [openModal, setOpen] = useState(false);
    const navigate = useNavigate();
    const [addUsers, setAddUsers] = useState<userType[]>([]);

    // For members popover
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    const addUser = async (member: userType) => {
        try {
            const res = await makeRequest("/project/" + projectId + "/users", "POST", member);
            if (res.data) {
                setalertState({ open: true, text: "User Added Successfully!", eventType: "success" });
                setOpen(false);
                window.location.reload();
            }
        } catch (error) {
            setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "error" });
        }
    }

    // To fetch new update for user if user doesn't exist
    useEffect(() => {
        const getUserDetails = async () => {
            const res = await makeRequest("/user", "GET");
            if (res.data.user) {
                setUser(res.data.user)
            }
            else navigate("/")
        }
        if (user.role === "") {
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

    // To fetch members for adding in the organisation
    useEffect(() => {
        const getMembers = async () => {
            try {
                const res = await makeRequest("/org/" + project.orgId + "/users", "GET");
                const users: userType[] = res.data?.users;
                const filteredUsers = users.filter(user => {
                    return !project.users.some(projectUser => projectUser.userId === user.userId);
                });
                if (filteredUsers) {
                    setAddUsers(filteredUsers);
                }
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })
            }
        }
        if (project)
            getMembers();
    }, [project])

    return (
        <div className="flex flex-row">
            {user.role === "owner" ? <OrgSidebar /> : <SideBar />}
            <div className="w-full px-4 sm:px-6 lg:w-3/4">
                {/* Header */}
                <div className="flex h-14 items-center justify-between">
                    <Link to="/dashboard" className="flex items-center gap-2"><i className="fa-solid fa-circle-arrow-left"></i> <span className="text-xs font-semibold underline">Jump to dashboard</span></Link>
                    {/* Members Popover */}
                    <div className="flex flex-wrap">
                        <div className="relative">
                            {user.role !== "user" && <Tooltip title="Add a new user to project"><Button variant="text" onClick={handleOpenModal} className="flex items-center gap-2 text-blue-500"><span className="hidden sm:block">Add User</span><PersonAddIcon /></Button></Tooltip>}
                            <Modal
                                open={openModal}
                                onClose={handleCloseModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <div className="flex absolute right-60 top-4">
                                    <List className="w-40 max-h-72 bg-white">
                                        {addUsers && addUsers.length > 0 ? (
                                            addUsers.map((member, i) => (
                                                <ListItem disablePadding key={i}>
                                                    <ListItemButton onClick={() => {
                                                        addUser(member);
                                                    }}>
                                                        <ListItemText primary={member.name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                        ) : (
                                            <p className="p-3">No members to add in the project. Invite members to your organisation!</p>
                                        )}
                                    </List>
                                </div>
                            </Modal>
                        </div>
                        <Tooltip title="Members who are part of the project">
                            <Button aria-describedby={id} onClick={handleClick}>
                                <div className="flex items-center gap-2 text-blue-500"><span className="hidden md:text-md sm:block">Members</span><Groups2Icon /></div>
                            </Button>
                        </Tooltip>
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
                            <Lists members={project?.users} showDelete={true} admin={user.role !== "user"} userId={user._id} />
                        </Popover>
                    </div>
                </div>
                {/* Project Details */}
                {project ? (
                    <div className="flex flex-col gap-4">
                        <div className="my-3 flex justify-between">
                            <h1 className="text-4xl font-bold"> {project.name} <span className="block mt-2 text-sm font-thin sm:inline"> Created By: @<Link to={"/user/" + project.createdBy.userId}>{project.createdBy.name}</Link> </span></h1>
                            {user.role !== "user" && <EditProjectModal project={project} />}
                        </div>
                        <div>
                            <span className="font-semibold">Description: </span>
                            {project.desc}
                        </div>
                        {/* Task History */}
                        <div className="border-2 min-h-fit my-4 py-4 p-2 md:p-4 rounded-lg flex flex-col gap-4">
                            <div className="w-full relative flex justify-between">
                                <h1 className="text-start md:text-center font-semibold text-xl inline-flex">Task History</h1>
                                {user.role !== "user" && <TaskModal />}
                            </div>
                            <div className="flex gap-4 flex-col">
                                {project.tasks && project.tasks.length > 0 ? (
                                    project.tasks.map((task, i) => (
                                        <Task key={i} taskId={new Types.ObjectId(task.taskId)} projectId={new Types.ObjectId(projectId)} />
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center h-32 text-center text-gray-700">
                                        Currently no tasks are available for this project.
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
