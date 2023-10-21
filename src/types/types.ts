import { AlertColor } from '@mui/material/Alert'
import { Types } from "mongoose";

// ---------- Global Types---------
export interface AlertPromptProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    eventType?: AlertColor
    text: string
}

export interface AlertTextdef {
    open: boolean,
    text: string,
    eventType: AlertColor
}

// ----------- Db models -------------------
type Role = "admin" | "user";

// Storing id for projects
export interface projectType {
    projectId: Types.ObjectId
}

// Storing id for users
export interface userType {
    userId: Types.ObjectId,
    role: Role
}

export interface chatToType {
    chatId: string,
    chatName: string
}

export interface taskType {
    taskId: Types.ObjectId
}

export interface commentType extends Document {
    userId: Types.ObjectId,
    userName: string,
    comment: string,
    timestamp: Date,
}

// ------ User Types -----------

export interface UserData {
    exist?: boolean,
    name: string,
    role: Role,
    email: string,
    passwd: string,
    projects?: projectType[],
    orgId: Types.ObjectId,
    chatTo?: chatToType[],
}

// ---------- Project Type -------------------
export interface IProject extends Document {
    name: string,
    desc: string,
    createdBy: userType,
    date: Date,
    orgId: Types.ObjectId,
    tasks?: taskType[],
    users?: userType[]
}

export interface ITask extends Document {
    name: string,
    desc: string,
    projectId: projectType,
    status?: string;
    assignedBy?: userType;
    assignedTo?: userType[],    /* Task can be assigned to more than one user*/
    createdBy: userType,
    date: Date,
    deadline?: Date,
    comments?: commentType[]
}