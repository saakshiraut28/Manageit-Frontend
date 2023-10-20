import { AlertColor } from '@mui/material/Alert'

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
    projectId: string
}

// Storing id for users
export interface userType {
    userId: string,
    role: Role
}

export interface chatToType {
    chatId: string,
    chatName: string
}


// ------ User Types -----------

export interface UserData {
	exist?: boolean,
    name: string,
    role: Role,
    email: string,
    passwd: string,
    projects?: projectType[],
    orgId: string,
    chatTo?: chatToType[],
}

// -----------------------------