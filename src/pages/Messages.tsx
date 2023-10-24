import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Divider, Button, Popover } from "@mui/material";
import { useState } from "react";
import Lists from "../components/Lists";
import AddIcon from '@mui/icons-material/Add';

const Messages = () => {

    // (Used Just for demonstration)
    // Fetch messages from user array and show that instead of this
    const [messages, setMessages] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    // For members popover
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="flex flex-row">
            <SideBar />
            {/* Message Inbox */}
            <div className="w-full px-4 mb-10 sm:px-6 lg:w-3/4">
                {/* Header */}
                <div className="flex h-14 items-center">
                    <Link to="/" className="flex items-center gap-2"><i className="fa-solid fa-circle-arrow-left"></i> <span className="text-xs font-semibold underline">Jump to dashboard</span></Link>
                </div>
                <div className="container">
                    <h1 className="text-2xl font-semibold ml-2 py-2 pb-6">Message Inbox</h1>
                    <Divider />
                    {/* Message Container */}
                    <div className="flex flex-col">
                        {messages ? (
                            <>
                                {/* Message label */}
                                <div>
                                    <Link
                                        to={"/chat/chatId"}
                                        className="hover:bg-gray-200 flex gap-2 px-4 py-4 justify-between items-center transition-all"
                                    >
                                        <h1>Saakshi Raut</h1>
                                        <span className="text-gray-600 text-sm">3 mins ago</span>
                                    </Link>
                                    <Divider />
                                </div>
                                {/* Message label */}
                                <div>
                                    <Link
                                        to={"/chat/chatId"}
                                        className="hover:bg-gray-200 flex gap-2 px-4 py-4 justify-between items-center transition-all"
                                    >
                                        <h1>Mayank Bansal</h1>
                                        <span className="text-gray-600 text-sm">23 hours ago</span>
                                    </Link>
                                    <Divider />
                                </div>
                                {/* Message label */}
                                <div>
                                    <Link
                                        to={"/chat"}
                                        className="hover:bg-gray-200 flex gap-2 px-4 py-4 justify-between items-center transition-all"
                                    >
                                        <h1>Arghya Das</h1>
                                        <span className="text-gray-600 text-sm">13 days ago</span>
                                    </Link>
                                    <Divider />
                                </div>
                            </>
                        ) : (
                            <p className="flex justify-center items-center h-[65vh]"> No messages to show in the inbox. Start a new chat with other members of the organisation</p>
                        )}
                    </div>
                </div>

                <div className="text-right">
                    <Button aria-describedby={id} onClick={handleClick}>
                        <div className="bg-blue-500 text-gray-800 w-10 h-10 flex items-center justify-center rounded-full"><AddIcon /></div>
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
                        {/* <Lists members={} /> */}
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Messages;
