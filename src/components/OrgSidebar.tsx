import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { userAtom } from '../atom/user';
import { makeRequest } from '../utils/api';

import { Typography, Toolbar, ListItem, List, Divider, Accordion, AccordionDetails, AccordionSummary, Paper, BottomNavigation, BottomNavigationAction, Tooltip, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Modal, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ProjectModal from "../components/ProjectModal";
import LogoutIcon from '@mui/icons-material/Logout';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';


const OrgSidebar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userAtom);
    const [value, setValue] = useState(0);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const style = {
        border: "none",
        boxShadow: 'none',
        innerHeight: '20px',
    };

    const projectStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    }

    return (
        <>
            {/* Left sidebar */}
            <div className="hidden lg:block w-1/5 h-screen">
                <Toolbar />
                <List>
                    <ListItem>
                        {/* Organization Name */}
                        <Typography>
                            <span className="text-2xl font-bold -mt-12 block">PushNote.</span>
                        </Typography>
                    </ListItem>
                    <Divider />

                    <Tooltip title="User Analytics">
                        <Link to="/org">
                            <ListItem className="my-3">
                                <div className="flex "><EqualizerIcon color="action" /><span className="pl-4 font-bold"> Analytics</span></div>
                            </ListItem>
                        </Link>
                    </Tooltip>
                    <Divider />

                    {/* Project Accordion */}
                    <Tooltip title="Projects">
                        <Accordion sx={style}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: "gray", alignItems: "end" }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div className="flex my-3"><CollectionsBookmarkIcon color="action" /><span className="pl-3 font-bold"> Projects</span></div>
                            </AccordionSummary>

                            <AccordionDetails className="accordion font-semibold flex items-center gap-1 hover:border-l-4 hover:border-blue-500 hover:bg-[#E8E8E8] transition-all">
                                <ProjectModal />
                            </AccordionDetails>

                            {user?.projects?.map((project, i) => (
                                <Link key={i} to={"/project/" + project?.projectId}>
                                    <AccordionDetails className="accordion hover:border-l-4 hover:border-[#FF0000] hover:bg-[#E8E8E8] transition-all">{project.name.length > 50 ? `${project.name.slice(0, 50)}...` : project.name}</AccordionDetails>
                                </Link>
                            ))}
                        </Accordion>
                    </Tooltip>
                    <Divider />

                    {/* Chat  */}
                    <Tooltip title="Invite new member to the organisation">
                        <Link to="/orgUser">
                            <ListItem className="my-3">
                                <div className="flex "><GroupIcon color="action" /><span className="pl-4 font-bold"> Users</span></div>
                            </ListItem>
                        </Link>
                    </Tooltip>
                    <Divider />

                    <Tooltip title="See how PushNote works!">
                        <ListItem className="my-3">
                            <>
                                <button type="button" className="flex" onClick={handleOpen}><InfoIcon color="action" /><span className="pl-4 font-bold"> Info</span></button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={projectStyle} className="overflow-y-scroll w-[95vw] md:w-[80vw]">
                                        <Typography id="modal-modal-title" variant="h5" component="h2">
                                            Check how PushNote Works.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            1. You setup your organisation account on the app. <br />
                                            2. You invite members to the organisation through their emails <br />
                                            3. You assign admin role to moderators/members for handling out projects and tasks. <br />
                                            4. Organisation Account is mainly for inviting members and keeping a eye on the project and users instead of managing them. For carrying out that function, make a admin account for interacting with workers in more efficient way. <br />
                                            5. There are mainly projects in the organisation. Tasks can be created inside each project. Project have members but not everyone has access to that project. Only the ones added in the project can see the project and assigned tasks. <br />
                                            6. Admins can create projects and tasks and assign them to members. But can't add new members to the organisation. <br />
                                            7. Under each task there is one status button which can be changed to stay updated. User can mark each task for review but only admin will be able to mark it completed. <br />
                                            8. Users who are part of the project can comment and discuss their thoughts under each task. <br />
                                            9. Users who are part of the organisation will be able to direct message each other through messages section. <br />
                                            10. So in short, through PushNote you can manage your tasks and workers effectively. Just setup organisation account and invite admins and users to the organisation and let admins do their work. <br />
                                            (Note:- More Features for organisation dashboard to be launched soon)
                                        </Typography>
                                    </Box>
                                </Modal>
                            </>
                        </ListItem>
                    </Tooltip>
                    <Divider />

                </List>
                {/* Logout Button */}
                <Tooltip title="Logout">
                    <ListItem className="mt-2">
                        <div>
                            <Button variant="outlined" startIcon={<LogoutIcon />} onClick={handleDialogOpen}>
                                Logout
                            </Button>
                            <Dialog
                                open={openDialog}
                                onClose={handleDialogClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">
                                    Logging out {user.name} from PushNote
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure you want to logout?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleDialogClose}>
                                        Nope
                                    </Button>
                                    <Button onClick={handleLogout} autoFocus>
                                        Ya, I'm going!
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </ListItem>
                </Tooltip>
            </div>
            {/* Bottom navbar */}
            <div className="block lg:hidden">
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <Tooltip title="Home">
                            <BottomNavigationAction href="/" label="Analytics" icon={<EqualizerIcon />} />
                        </Tooltip>
                        <Tooltip title="Projects">
                            <BottomNavigationAction href="/project" label="Projects" icon={<CollectionsBookmarkIcon />} />
                        </Tooltip>
                        <Tooltip title="Invite new users">
                            <BottomNavigationAction href="/orgUser" label="Users" icon={<GroupIcon />} />
                        </Tooltip>
                        <Tooltip title="See how the app works!">
                            <BottomNavigationAction onClick={handleOpen} label="Info" icon={<InfoIcon />} />
                        </Tooltip>
                        <Tooltip title="Logout">
                            <BottomNavigationAction label="Logout" onClick={handleDialogOpen} icon={<LogoutIcon />} />
                        </Tooltip>
                    </BottomNavigation>
                </Paper>
            </div>
        </>
    )
}

export default OrgSidebar;
