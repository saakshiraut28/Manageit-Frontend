import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, OutlinedInput, MenuItem, FormControl, Select, SelectChangeEvent, Chip } from '@mui/material';
import { makeRequest } from "../utils/api";
import { useRecoilState } from "recoil";
import { alertAtom } from "../atom/global";
import { useParams } from "react-router-dom";

export default function TaskStatus({ taskStatus, userRole, projectId }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<string>("");
    const { taskId } = useParams();
    const [alertState, setalertState] = useRecoilState(alertAtom);

    const handleChange = (event: SelectChangeEvent<typeof status>) => {
        setStatus((event.target.value));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const updateStatus = async () => {
        if (status && taskId) {
            try {
                const res = await makeRequest("/task/" + taskId + "/status", "PUT", { status: status, projectId: projectId })
                if (res.data) {
                    setalertState({ open: true, text: "Task status updated Successfully!", eventType: "success" });
                    window.location.reload();
                }
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "error" });
            }
        }
    }

    return (
        <span>
            <Chip size="small" color={taskStatus === "Completed" ? "success" : "info"} label={taskStatus} className="m-2" onClick={handleClickOpen} />
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select Task Status</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel htmlFor="demo-dialog-native">Task Status</InputLabel>
                            <Select
                                native
                                value={status}
                                onChange={handleChange}
                                input={<OutlinedInput label="Task Status" id="demo-dialog-native" />}
                            >
                                <option value="" disabled></option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="In Review">In Review</option>
                                {userRole !== "user" && <option value="Completed">Completed</option>}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateStatus}>Update Status</Button>
                </DialogActions>
            </Dialog>
        </span>
    );
}