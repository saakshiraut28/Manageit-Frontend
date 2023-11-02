/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Modal, Button, Tooltip } from "@mui/material";
import { IProject } from "../types/types";
import { makeRequest } from "../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import { useRecoilState } from "recoil";
import { alertAtom } from "../atom/global";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "3px solid",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(to bottom, #FF7B7B, #F14DFF)",
    boxShadow: 24,
    p: 4,
};

interface EditProjectModalProps {
    project: IProject
}

export default function EditProjectModal({ project }: EditProjectModalProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [alertState, setalertState] = useRecoilState(alertAtom);
    const { projectId } = useParams();

    const updateProject = async () => {
        const updatedProject = {
            ...project,
            name: title,
            desc: desc,
        }
        try {
            const res = await makeRequest("/project/" + projectId, "PUT", updatedProject);
            if (res.data) {
                setalertState({ open: true, text: "Project Updated!", eventType: "success" });
                window.location.reload();
            }
        } catch (error) {
            setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "error" });
        }
    }

    useEffect(() => {
        if (project) {
            setTitle(project.name);
            setDesc(project.desc);
        }
    }, [project]);

    return (
        <>
            <Tooltip title="Edit the project details">
                <Button onClick={handleOpen}><EditIcon />Edit</Button>
            </Tooltip>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <form className="w-full pb-20 px-16">
                        <div className="w-full font-semibold text-2xl my-12">
                            Project &gt;&gt;&gt; Ideas.
                        </div>
                        <div className="w-full">
                            <div className="bg-black hover:bg-gradient-to-r hover:from-[#FF7B7B]  hover:to-[#F14DFF] mb-4 pb-[2px] ">
                                <input
                                    className="title bg-gray-200 outline-none w-full h-10 p-1 pl-4 text-sm hover:font-medium"
                                    placeholder="Project Title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="bg-black hover:bg-gradient-to-r hover:from-[#FF7B7B]  hover:to-[#F14DFF] mb-4 pb-[2px]">
                                <textarea
                                    className="description bg-gray-200 outline-none w-full h-32 p-1 pl-4 text-sm hover:font-medium"
                                    placeholder="Describe everything about this project here"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button variant="contained" color="secondary" onClick={updateProject}>Update Project</Button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
