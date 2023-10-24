import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { userType } from "../types/types"

interface ListsProps {
    members: userType[];
}

const Lists: React.FC<ListsProps> = ({ members }) => {
    return (
        <>
            <List className="w-40 max-h-72">
                {members && members.length > 0 ? (
                    members.map(member => (
                        <ListItem disablePadding>
                            <ListItemButton component="a" href={"/user/" + member.userId}>
                                <ListItemText primary={member.name} />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <p className="p-3">No members currently. Try to add one in the project</p>
                )}
            </List>
        </>
    )
}

export default Lists;
