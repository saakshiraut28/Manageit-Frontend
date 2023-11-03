import { sendChatIp } from "../types/types"

const backend = import.meta.env.VITE_SERVER;

export const sendChatToDb = async ({ senderId, receiverId, senderName, receiverName, message }: sendChatIp) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const resp = await fetch(`${backend}/chat`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ senderId, receiverId, senderName, receiverName, message })
        })
        const respOp = await resp.json();
        console.log(respOp);
    } catch (err) {
        console.log(err);
    }
}

export async function getChatById(id: number) {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const resp = await fetch(`${backend}/chat/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        const respOp = await resp.json();
        console.log(respOp);
        return respOp
    } catch (err) {
        console.log(err);
    }
}
