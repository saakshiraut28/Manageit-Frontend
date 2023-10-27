import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Button, Divider, Input } from "@mui/material"
import SideBar from "./SideBar"
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import SendIcon from "@mui/icons-material/Send";
import { userAtom } from "../atom/user"
import { useRecoilState } from "recoil";
import { makeRequest } from "../utils/api"
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom';
import { getChatById, sendChatToDb } from "../services/chat";

const backend = 'http://localhost:8000' ;

const myChatDiv = "justify-start"
const senderChatDiv = "justify-end"
const myChatP = "bg-green-500 rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-md"
const senderChatP = "bg-blue-500 rounded-tl-md rounded-tr-none rounded-br-md rounded-bl-md"

const Chat = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [socket, setsocket] = useState(null) ;
    const [Chats, setChats] = useState([]) ;
    const { name: recieverName, userId: recieverId } = useParams();

    useEffect(() => {
        const getUserDetails = async () => {
            const res = await makeRequest("/user", "GET");
            if (res.data.user) {
                setUser(res.data.user)
                console.log("User updated!");
                const prevChat = res.data.user.chatTo.find(obj => obj.memberId===recieverId) ;
                if (prevChat){
                    const chatMessages = await getChatById(prevChat.chatId);
                    const chatMessageArr = chatMessages.chats.messages ;
                    const formatMessage = chatMessageArr.map(elem => ({
                        message: elem.message,
                        senderId: elem.userId
                    }))
                    // console.log("chatMessage\n",formatMessage) ;
                    setChats(formatMessage) ;
                }
            }
        }
        getUserDetails();
    }, [])

    useEffect(() => {
        if (user.role==='') return;
        const ID = user._id;
        console.log("ID =>",ID) ;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const skt = io(backend) ;
        skt.on('connect',() => {
          console.log(`you are connected`) ;
        })
        skt.emit('join',ID) ;
        // const users = [2] ;
        // users.forEach((elem)=> {
        //   skt.emit('join',elem) ;
        // })
    
        // recieve msg
        skt.on('recieved-msg',(recID, senderId, msg) => {
        //   if (senderId===ID) return;
          // if (currChat._id===recId) {
          //   // console.log("here") ;
          //   setCurrChat(prevData => ({
          //     ...prevData,
          //     user_msg: [...prevData.user_msg, {_id:'', user: senderId, msg: msg} ]
          //   }))
          // }
          setChats(prev => ([...prev,{message: msg, senderId: senderId}])) ;
        })
        setsocket(skt) ;

        return () => {
            skt.disconnect() ;
        };
    }, [user])
    

    // Handle Send message func here!
    const sendMessage = (e) => {
        e.preventDefault() ;
        // const recieverID = e.target.recId.value ;
        const msg = e.target.msg.value ;
        e.target.msg.value = '';
        console.log(recieverId,msg,user._id) ;
        socket.emit('new-chat',({recID: recieverId, sender: user._id, msg: msg})) ;
        setChats(prev => ([...prev,{message: msg, senderId: user._id}])) ;
        sendChatToDb({ senderId: user._id, receiverId: recieverId, senderName: user.name, receiverName: recieverName, message: msg}) ;
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
                        <h1 className="text-xl bg-gray-300 p-3 pl-5 mb-4">{recieverName}</h1>
                        <div className="flex gap-4 flex-col mb-10 h-[50vh] overflow-y-scroll lg:h-[60vh] lg:mb-2">
                            {/* Example of receiver message */}
                            {Chats.map((elem,ind)=> (
                                <div key={ind} className={`w-full flex flex-row ${elem.senderId===user._id? myChatDiv: senderChatDiv}`}>
                                    <p className={`mx-2 py-1 px-1 text-white ${elem.senderId===user._id? myChatP: senderChatP}`}>{elem.message}</p>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={sendMessage}  className="pt-1 flex flex-row">
                            {/* <Input placeholder="Type your message...." required={true} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-2 pr-12 -mr-16" /> */}
                            {/* <Button endIcon={<SendIcon />} type="button" disabled={!message} onClick={sendMessage} /> */}
                            <input type="text" placeholder="Send message..." name="msg" className="w-full p-2 mr-2 border"/>
                            <button type="submit" className=""><SendIcon /></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
