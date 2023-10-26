import { useState } from "react";
import { Link } from "react-router-dom"
import { Button, Divider, Input } from "@mui/material"
import SideBar from "./SideBar"
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import SendIcon from "@mui/icons-material/Send";

const Chat = () => {
    const [message, setMessage] = useState("");

    // Handle Send message func here!
    const sendMessage = () => {
        console.log(message);
    }

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
                    <h1 className="text-2xl font-semibold ml-2 py-2 pb-6">Talk it Out <SmsRoundedIcon color="primary" /> !!</h1>
                    <Divider />
                    {/* Message Container */}
                    <div className="flex flex-col">
                        {/* Receiver Name */}
                        <h1 className="text-xl bg-gray-300 p-3 pl-5 mb-4">Saakshi Raut</h1>
                        <div className="flex gap-4 flex-col mb-10 h-[50vh] overflow-y-scroll lg:h-[60vh] lg:mb-2">
                            {/* Example of receiver message */}
                            <div className="mr-2">
                                <div className="mb-3">
                                    <Link to={"/user/"} className="inline underline text-lg">@userName</Link> <span className="text-xs text-gray-500 pl-2">
                                        {/* {calculateTime(comment.timestamp) || ""}  */}
                                        3 days ago
                                    </span>
                                </div>
                                <div className="bg-gray-200 border-l-4 border-gray-400 p-5">message</div>
                            </div>

                            {/* For sender user message */}
                            <div className="mr-2 flex flex-col text-right items-end">
                                <div className="mb-3">
                                    <Link to={"/user/"} className="inline underline text-lg">@me</Link> <span className="text-xs text-gray-500 pl-2">
                                        {/* {calculateTime(comment.timestamp) || ""}  */}
                                        just now
                                    </span>
                                </div>
                                <div className="bg-blue-400 border-r-4 border-gray-400 p-5 w-full">message</div>
                            </div>
                        </div>
                        <div className="pt-1">
                            <Input placeholder="Type your message...." required={true} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-2 pr-12 -mr-16" />
                            <Button endIcon={<SendIcon />} type="button" disabled={!message} onClick={sendMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
