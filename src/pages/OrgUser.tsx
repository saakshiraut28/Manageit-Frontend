import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrgSidebar from "../components/OrgSidebar";
import { Button, TextField, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Divider } from "@mui/material";
import { makeRequest } from "../utils/api";
import { useRecoilState } from "recoil";
import { userAtom } from "../atom/user";
import { alertAtom } from "../atom/global";
import { userType } from "../types/types";
import DeleteIcon from '@mui/icons-material/Delete';

const OrgUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [user, setUser] = useRecoilState(userAtom);
    const [alertState, setalertState] = useRecoilState(alertAtom);
    const [users, setUsers] = useState<userType[]>([]);

    // To fetch new update for user if user doesn't exist
    useEffect(() => {
        const getUserDetails = async () => {
            const res = await makeRequest("/org", "GET");
            if (res.data.org) {
                setUser(res.data.org)
            }
        }
        if (user.role === "") {
            getUserDetails();
        }
    }, [])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await makeRequest("/org/" + user._id + "/users", "GET");
                if (res.data.users) {
                    setUsers(res.data.users);
                }
            } catch (error) {
                setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "warning" })
            }
        }
        if (user?._id) {
            getUsers();
        }
    }, [user])


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmail("");
        setName("");
        setRole("");

        try {
            const res = await makeRequest("/auth/signup", "POST", { name, email, role, orgId: user?._id })
            if (res.data) {
                setalertState({ open: true, text: "User Signed Up Successful!", eventType: "success" })
            }
        } catch (error) {
            setalertState({ open: true, text: "Error occured. Try again!", eventType: "error" })
        }
    }

    const deleteUser = async (user: userType) => {
        try {
            const res = await makeRequest("/user/" + user?.userId, "DELETE", {})
            if (res.data) {
                setalertState({ open: true, text: "User Deleted!", eventType: "success" })
            }
        } catch (error) {
            setalertState({ open: true, text: "Error occured. Try again!", eventType: "error" })
        }
    }

    return (
        <div className="flex flex-row">
            <OrgSidebar />
            {/* Mid Dashboard Section */}
            <div className="flex flex-col text-center w-screen py-6 lg:w-[70vw] h-screen">
                <div className="flex items-center flex-col">
                    <h2>Invite a new member to the Organisation</h2>
                    <form className="w-4/5 flex flex-col items-center gap-5 my-8" onSubmit={onSubmit}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            className="w-full"
                            value={name}
                            required={true}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            className="w-full"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormControl className="w-full">
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className="text-start"
                                value={role}
                                label="Role"
                                onChange={(event) => setRole(event.target.value as string)}
                            >
                                <MenuItem value={"admin"}>Admin</MenuItem>
                                <MenuItem value={"user"}>User</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="w-40"
                        >
                            Send Invite
                        </Button>
                    </form>
                </div>
                {/* Users Lists */}
                <h1 className="text-lg">Members Lists</h1>
                <div className="flex flex-col h-[65vh] overflow-y-scroll">
                    {users.length > 0 ? (
                        <>
                            {users.map((user, i) => (
                                <div key={i}>
                                    <div className="hover:bg-gray-200 flex gap-2 px-4 py-4 justify-between items-center transition-all">
                                        <Link to={`/user/${user.userId}`}>
                                            <h1 className="font-semibold text-lg inline-flex">{user.name}</h1>
                                        </Link>
                                        <Button onClick={() => deleteUser(user)}><DeleteIcon /></Button>
                                    </div>
                                    <Divider />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p className="flex justify-center items-center h-[65vh]"> No messages to show in the inbox. Start a new chat with other members of the organisation</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrgUser
