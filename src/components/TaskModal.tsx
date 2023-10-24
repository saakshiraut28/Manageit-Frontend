/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "3px solid",
  borderImageSlice: 1,
  borderImageSource: "linear-gradient(to bottom, #FF7B7B, #F14DFF)",
  boxShadow: 24,
  p: 4,
};

export default function TaskModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        
        <Box sx={style}>
          <form className="w-full pb-20 px-16 ">
            <div className="w-full font-bold text-2xl my-12">
              So, who you gonna trouble today?
            </div>{" "}
            <div className="w-full">
              <div className="bg-black hover:bg-gradient-to-r hover:from-[#FF7B7B]  hover:to-[#F14DFF] mb-4 pb-0.5 ">
                <input
                  className="title bg-[#E8E8E8] outline-none w-full p-1 pl-4 text-sm hover:font-medium"
                  placeholder="Task Title"
                  type="text"
                />
              </div>
              <div className="bg-black hover:bg-gradient-to-r hover:from-[#FF7B7B]  hover:to-[#F14DFF] mb-4 pb-0.5">
                <textarea
                    className="description bg-[#E8E8E8] outline-none w-full p-1 pl-4 text-sm hover:font-medium"
                    placeholder="Describe everything about this task here"
                />
                </div>
              <div className="bg-black hover:bg-gradient-to-r hover:from-[#FF7B7B]  hover:to-[#F14DFF] mb-4 pb-0.5">
                <input
                  className="title bg-[#E8E8E8] p-1 pl-4 outline-none w-full text-sm hover:font-medium"
                  placeholder="Assigned To"
                  type="text"
                />
              </div>
              <div className="flex space-x-4 mb-8">
                <div className="w-full bg-black hover:bg-gradient-to-r hover:from-[#FF7B7B]  hover:to-[#F14DFF] pb-0.5">
                  <input
                    className="title w-full bg-[#E8E8E8] p-1 pl-4 outline-none text-sm hover:font-medium"
                    placeholder="Set Deadline"
                    type="text"
                  />
                </div>
                <div className="w-full bg-black hover:bg-gradient-to-r hover:from-[#FF7B7B]  hover:to-[#F14DFF] pb-0.5">
                  <input
                    className="title w-full bg-[#E8E8E8] p-1 pl-4 outline-none text-sm hover:font-medium"
                    placeholder="Category"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </form>
        </Box> 
      </Modal>
    </div>
  );
}
