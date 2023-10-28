/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Modal, Button, Select, SelectChangeEvent, FormControl, InputLabel, OutlinedInput, Chip, MenuItem, Tooltip } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ITask, userType } from "../types/types";
import { makeRequest } from "../utils/api";
import { useRecoilState } from "recoil";
import { alertAtom } from "../atom/global";
import EditIcon from "@mui/icons-material/Edit";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface EditTaskModalProps {
    task: ITask;
}

export default function EditTaskModal({ task }: EditTaskModalProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { taskId } = useParams();
    const [users, setUsers] = useState<userType[]>([]);
    const [personName, setPersonName] = useState<string[]>([]);
    const [name, setName] = useState<string>(task?.name);
    const [desc, setDesc] = useState<string>(task?.desc);
    const [deadline, setDeadline] = useState<Dayjs | null>(task?.deadline ? dayjs(task.deadline) : null);
    const [alertState, setalertState] = useRecoilState(alertAtom);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        if (task) {
            setName(task?.name);
            setDesc(task?.desc);
            setDeadline(task?.deadline ? dayjs(task?.deadline) : null)
            const userNames = task.assignedTo.map((user) => user.name);
            setPersonName(userNames);
        }
    }, [task])

    // To fetch all users from project for assigning the task
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await makeRequest("/project/" + task.projectId + "/users", "GET");
                if (res.data?.users) {
                    setUsers(res.data.users)
                }
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "error" });
            }
        }
        if (task?.projectId) {
            getUsers();
        }
    }, [task?.projectId])


    const updateTask = async () => {
        if (name && desc) {
            const selectedAssignees = personName.map((name) => {
                const selectedUser = users.find((user) => user.name === name);
                return selectedUser ? { userId: selectedUser.userId, name: selectedUser.name } : null;
            });
            const updatedTask = {
                ...task,
                name,
                desc,
                deadline: deadline?.toDate(),
                assignedTo: selectedAssignees,
            }

            try {
                const res = await makeRequest("/task/" + taskId, "PUT", updatedTask)
                if (res.data) {
                    setalertState({ open: true, text: "Task updated Successfully!", eventType: "success" });
                    window.location.reload();
                }
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "error" });
            }
        }
    }

    return (
        <>
            <Tooltip title="Edit the task">
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
                    <form className="w-full pb-20 px-16 ">
                        <div className="w-full font-bold text-2xl my-12">
                            So, who you gonna trouble today?
                        </div>{" "}
                        <div className="w-full">
                            <div className="bg-black hover:bg-gradient-to-r hover:from-[#FF7B7B]  hover:to-[#F14DFF] mb-4 pb-0.5">
                                <input
                                    className="title bg-gray-100 outline-none w-full h-10 p-1 pl-4 text-sm hover:font-medium"
                                    placeholder="Task Title"
                                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="bg-black hover:bg-gradient-to-r hover:from-[#FF7B7B]  hover:to-[#F14DFF] mb-4 pb-0.5">
                                <textarea
                                    className="description bg-gray-100 outline-none w-full h-32 p-1 pl-4 text-sm hover:font-medium"
                                    placeholder="Describe everything about this task here"
                                    value={desc} onChange={(e) => setDesc(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="my-4">
                                <FormControl className="w-full">
                                    <InputLabel id="demo-multiple-chip-label">Select Assignees</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Select Assignees" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value, i) => (
                                                    <Chip key={i} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {users?.map((user, i) => (
                                            <MenuItem
                                                key={i}
                                                value={user.name}
                                            >
                                                {user.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Set deadline"
                                        disablePast={true}
                                        value={deadline}
                                        onChange={(newValue) => setDeadline(newValue)}
                                        className="w-full"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button variant="contained" color="secondary" onClick={updateTask}>Update Task</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
