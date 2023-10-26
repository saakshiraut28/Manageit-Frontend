/** @format */

import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilState } from "recoil";
import { userAtom } from "../atom/user";
import { IProject } from "../types/types";
import { makeRequest } from "../utils/api";

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


export default function ProjectModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [user, setUser] = useRecoilState(userAtom);

  const createProject = async () => {
    const newProject = {
      name: title,
      desc: desc,
      orgId: user.orgId,
      createdBy: {
        userId: user._id,
        name: user.name
      },
      date: new Date()
    }
    try {
      const res = await makeRequest("/project", "POST", newProject);
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button onClick={handleOpen}>Create New Project <AddIcon /></Button>
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
                <Button variant="contained" color="secondary" onClick={createProject}>Create Project</Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
