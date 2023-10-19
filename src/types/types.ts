import { AlertColor } from '@mui/material/Alert'

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