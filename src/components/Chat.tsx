import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { Divider } from "@mui/material"
import SideBar from "./SideBar"
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import SendIcon from "@mui/icons-material/Send";
import { userAtom } from "../atom/user"
import { useRecoilState } from "recoil";
import { makeRequest } from "../utils/api"
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom';
import { getChatById, sendChatToDb } from "../services/chat";
import { calculateTime } from "../utils/calculateTime";
import { Button } from "@mui/material"

const backend = import.meta.env.VITE_SERVER ;

const senderChatDiv = "justify-start"
const myChatDiv = "justify-end"
const myChatP = "bg-blue-500 rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-md max-w-[60vw]"
const senderChatP = "bg-green-500 rounded-tl-md rounded-tr-none rounded-br-md rounded-bl-md max-w-[60vw]"

const Chat = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [socket, setsocket] = useState(null);
    const [Chats, setChats] = useState([]);
    const { name: recieverName, userId: recieverId } = useParams();
    const chatDiv = useRef(null) ;

    useEffect(() => {
        const getUserDetails = async () => {
            const res = await makeRequest("/user", "GET");
            if (res.data.user) {
                setUser(res.data.user)

                const prevChat = res.data.user.chatTo.find(obj => obj.memberId === recieverId);
                if (prevChat) {
                    const chatMessages = await getChatById(prevChat.chatId);
                    const chatMessageArr = chatMessages.chats.messages;
                    const formatMessage = chatMessageArr.map(elem => ({
                        message: elem.message,
                        senderId: elem.userId,
                        timestamp: elem.timestamp
                    }))
                    // console.log("chatMessage\n",formatMessage) ;
                    setChats(formatMessage);
                }
            }
        }
        getUserDetails();
    }, [])

    useEffect(() => {
        if (user.role === '') return;
        const ID = user._id;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const skt = io(backend);
        skt.on('connect', () => {
            console.log(`you are connected`);
        })
        skt.emit('join', ID);
        // const users = [2] ;
        // users.forEach((elem)=> {
        //   skt.emit('join',elem) ;
        // })

        // recieve msg
        skt.on('recieved-msg', (recID, senderId, msg) => {
            //   if (senderId===ID) return;
            // if (currChat._id===recId) {
            //   // console.log("here") ;
            //   setCurrChat(prevData => ({
            //     ...prevData,
            //     user_msg: [...prevData.user_msg, {_id:'', user: senderId, msg: msg} ]
            //   }))
            // }
            setChats(prev => ([...prev, { message: msg, senderId: senderId, timestamp: new Date() }]));
            // chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
        })
        setsocket(skt);

        return () => {
            skt.disconnect();
        };
    }, [user])


    // Handle Send message func here!
    const sendMessage = (e) => {
        e.preventDefault();
        // const recieverID = e.target.recId.value ;
        const msg = e.target.msg.value;
        if (msg) {
            e.target.msg.value = '';
            socket.emit('new-chat', ({ recID: recieverId, sender: user._id, msg: msg }));
            setChats(prev => ([...prev, { message: msg, senderId: user._id }]));
            sendChatToDb({ senderId: user._id, receiverId: recieverId, senderName: user.name, receiverName: recieverName, message: msg });
            // chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
        }
    }

    return (
        <div className="flex flex-row">
            <SideBar />
            {/* Message Inbox */}
            <div className="w-full px-4 mb-10 sm:px-6 lg:w-3/4">
                {/* Header */}
                <div className="flex h-14 items-center">
                    <Link to="/messages" className="flex items-center gap-2"><i className="fa-solid fa-circle-arrow-left"></i> <span className="text-xs font-semibold underline">Jump to Messages</span></Link>
                </div>

                <div className="pb-4">
                    <h1 className="text-2xl font-semibold ml-2 py-2 pb-6">Talk it Out <SmsRoundedIcon color="primary" /> !!</h1>
                    <Divider />
                    {/* Message Container */}
                    <div className="flex flex-col">
                        {/* Receiver Name */}
                        <h1 className="text-xl bg-gray-300 p-3 pl-5 mb-4">{recieverName}</h1>
                        {/* Chat Messages */}
                        <div ref={chatDiv} className="flex gap-4 flex-col mb-10 h-[50vh] overflow-y-scroll lg:h-[60vh] lg:mb-2">
                            {Chats.map((elem, ind) => (
                                <div key={ind} className={`w-full flex flex-row ${elem.senderId === user._id ? myChatDiv : senderChatDiv}`}>
                                    {elem.senderId === user._id && 
                                    <span className="text-sm flex justify-center items-end text-gray-500">{calculateTime(elem?.timestamp) || ""}</span>}
                                    
                                    <p className={`mx-2 p-3 text-white overflow-hidden break-words ${elem.senderId === user._id ? myChatP : senderChatP}`}>{elem.message}</p>
                                    {elem.senderId !== user._id && 
                                    <span className="text-sm flex justify-center items-end text-gray-500">{calculateTime(elem?.timestamp) || ""}</span>}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={sendMessage} className="py-1 flex flex-row">
                            {/* <Input placeholder="Type your message...." required={true} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-2 pr-12 -mr-16" /> */}
                            {/* <Button endIcon={<SendIcon />} type="button" disabled={!message} onClick={sendMessage} /> */}
                            <input type="text" placeholder="Send message..." name="msg" className="w-full p-2 mr-2 border outline-none" />
                            <Button type="submit" className=""><SendIcon /></Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;