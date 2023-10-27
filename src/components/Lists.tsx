import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { userType } from "../types/types"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { makeRequest } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Types } from "mongoose";
import { useRecoilState } from "recoil";
import { alertAtom } from "../atom/global";

interface ListsProps {
    members: userType[];
    showDelete: boolean,
    admin: boolean,
    userId: Types.ObjectId
}

const Lists: React.FC<ListsProps> = ({ members, showDelete = false, admin = false, userId = null }) => {
    const [alertState, setalertState] = useRecoilState(alertAtom);
    const { projectId } = useParams();

    const removeUser = async (userId: Types.ObjectId) => {
        try {
            const res = await makeRequest("/project/" + projectId + "/users", "DELETE", { userId: userId });
            if (res.data) {
                setalertState({ open: true, text: "User Deleted Successfully!", eventType: "success" });
                window.location.reload();
            }
        } catch (error) {
            setalertState({ open: true, text: "Some Error occured. Try again!", eventType: "error" });
        }
    }

    return (
        <>
            <List className="w-50 max-h-72">
                {members && members.length > 0 ? (
                    members.map((member, i) => (
                        <ListItem disablePadding key={i}>
                            <ListItemButton component="a" href={"/user/" + member.userId}>
                                <ListItemText primary={member.name} />
                            </ListItemButton>
                            {userId !== member.userId && showDelete && admin && <ListItemButton><DeleteOutlineIcon onClick={() => removeUser(member.userId)} /></ListItemButton>}
                        </ListItem>
                    ))
                ) : (
                    <p className="w-60 p-3">No members currently. Try to add one in the project</p>
                )}
            </List>
        </>
    )
}

export default Lists;
