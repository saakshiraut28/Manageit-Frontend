import { Link, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Divider, Button, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import Lists from "../components/Lists";
import AddIcon from '@mui/icons-material/Add';
import { makeRequest } from "../utils/api";
import { useRecoilState } from "recoil";
import { alertAtom } from "../atom/global";
import { userAtom } from "../atom/user";
import { userType } from "../types/types"
import OrgSidebar from "../components/OrgSidebar";

const Messages = () => {
    const navigate = useNavigate();    
    const [members, setMembers] = useState<userType[]>();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [alertState, setalertState] = useRecoilState(alertAtom);
    const [user, setUser] = useRecoilState(userAtom);

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
            }
            else navigate("/")
        }
        if (user.role === '') {
            getUserDetails();
        }
    }, []);


    // For fetching users in the organisation
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await makeRequest(`/org/${user.orgId}/users`, "GET");
                if (res.data?.users) {
                    const filteredUsers = res.data.users.filter((member) => member.userId !== user._id);
                    setMembers(filteredUsers);
                }
            } catch (error) {
                setalertState({ open: true, text: "Some Error occurred. Try again!", eventType: "warning" });
            }
        };
        fetchUsers();
    }, [user]);


    return (
        <div className="flex flex-row">
            {user.role === "owner" ? <OrgSidebar /> : <SideBar />}
            {/* Message Inbox */}
            <div className="w-full px-4 mb-10 sm:px-6 lg:w-3/4">
                {/* Header */}
                <div className="flex h-14 items-center">
                    <Link to="/dashboard" className="flex items-center gap-2"><i className="fa-solid fa-circle-arrow-left"></i> <span className="text-xs font-semibold underline">Jump to dashboard</span></Link>
                </div>

                <div className="container">
                    <h1 className="text-2xl font-semibold ml-2 py-2 pb-6">Message Inbox</h1>
                    <Divider />
                    {/* Message Container */}
                    <div className="flex flex-col h-[65vh] overflow-y-scroll">
                        {user.chatTo.length > 0 ? (
                            <>
                                {user.chatTo.map((elem, ind) => (
                                    // <p key={ind}>{elem.name}</p>
                                    <div key={ind} className="py-1">
                                        <Link
                                            to={`/chat/${elem.name}/${elem.memberId}`}
                                            className="hover:bg-gray-200 flex gap-2 px-4 py-6 justify-between items-center transition-all"
                                        >
                                            <h1 className="font-semibold text-lg">{elem.name}</h1>
                                        </Link>
                                        <Divider />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className="flex justify-center items-center h-[65vh]"> No messages to show in the inbox. Start a new chat with other members of the organisation</p>
                        )}
                    </div>
                </div>

                {/* Button on bottom right for new message */}
                <div className="text-right">
                    <Button aria-describedby={id} onClick={handleClick}>
                        <div className="bg-[#1976d2] text-[rgba(0,0,0,0.6)] w-10 h-10 flex items-center justify-center rounded-full"><AddIcon /></div>
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        {/* Pass organisation users here! */}
                        {members ? (
                            <Lists members={members} showDelete={false} admin={false} userId={null} />
                        )
                            : (
                                <p>Members of the organisation will appear here!</p>
                            )}
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Messages;
