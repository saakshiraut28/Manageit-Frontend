/** @format */

import { useState } from "react";
import { Box, Modal, Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilState } from "recoil";
import { userAtom } from "../atom/user";
import { IProject } from "../types/types";
import { makeRequest } from "../utils/api";
import { alertAtom } from "../atom/global";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "3px solid",
  borderImageSlice: 1,
  borderImageSource: "linear-gradient(to bottom, #FF7B7B, #F14DFF)",
  boxShadow: 24,
  p: 4,
};


export default function ProjectModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [user] = useRecoilState(userAtom);
  const [alertState, setalertState] = useRecoilState(alertAtom);

  const createProject = async () => {
    let orgId;
    if (user.role === "owner") {
      orgId = user._id
    } else {
      orgId = user.orgId
    }
    const newProject = {
      name: name,
      desc: desc,
      orgId: orgId,
      createdBy: {
        userId: user._id,
        name: user.name
      },
      date: new Date()
    }
    try {
      const res = await makeRequest("/project", "POST", newProject);
      if (res.data) {
        setalertState({ open: true, text: "Project created! Successfully!", eventType: "success" });
        window.location.reload();
      }
    } catch (error) {
      setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "error" });
    }
  }

  return (
    <>
      <Tooltip title="Create a new project">
        <Button onClick={handleOpen}>Create New Project <AddIcon /></Button>
      </Tooltip>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <form className="w-full m:pb-20 m:px-16">
            <div className="w-full font-semibold text-2xl my-12">
              Project &gt;&gt;&gt; Ideas.
            </div>
            <div className="w-full">
              <div className="bg-black hover:bg-gradient-to-r hover:from-[#FF7B7B]  hover:to-[#F14DFF] mb-4 pb-[2px] ">
                <input
                  className="title bg-gray-200 outline-none w-full h-10 p-1 pl-4 text-sm hover:font-medium"
                  placeholder="Project Title"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                {name && desc && <Button variant="contained" color="secondary" onClick={createProject}>Create Project</Button>}
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
