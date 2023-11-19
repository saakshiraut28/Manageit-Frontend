import { Typography, Toolbar, ListItem, List, Divider, Accordion, AccordionDetails, AccordionSummary, Paper, BottomNavigation, BottomNavigationAction, Tooltip, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import { useRecoilState } from "recoil";
import { userAtom } from "../atom/user";
import ProjectModal from "./ProjectModal";
import LogoutIcon from '@mui/icons-material/Logout';

const SideBar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [value, setValue] = useState(0);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [user, setUser] = useRecoilState(userAtom);

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

    useEffect(() => {
        // For the date in the sidebar
        const date = new Date();
        setCurrentDate(date);
        setDay(date.getDate().toString());
        setMonth(date.toLocaleString('default', { month: 'long' }));
        setDayOfWeek(date.toLocaleString('default', { weekday: 'long' }));
    }, []);

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

                    <Tooltip title="Home">
                        <Link to="/dashboard">
                            <ListItem className="my-3">
                                <div className="flex "><HomeIcon color="action" /><span className="pl-4 font-bold"> Home</span></div>
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

                            {user?.role !== "user" && <AccordionDetails className="accordion font-semibold flex items-center gap-1 hover:border-l-4 hover:border-blue-500 hover:bg-[#E8E8E8] transition-all"><ProjectModal /></AccordionDetails>}

                            {user?.projects?.map((project, i) => (
                                <Link key={i} to={"/project/" + project?.projectId}>
                                    <AccordionDetails className="accordion hover:border-l-4 hover:border-[#FF0000] hover:bg-[#E8E8E8] transition-all">{project.name.length > 50 ? `${project.name.slice(0, 50)}...` : project.name}</AccordionDetails>
                                </Link>
                            ))}
                        </Accordion>
                    </Tooltip>
                    <Divider />

                    {/* Calendar */}
                    <Tooltip title="Check your deadlines">
                        <Link to="/calendar">
                            <ListItem>
                                <div className="py-1">
                                    <span className="font-semibold text-xl">
                                        {month}
                                    </span>
                                    <br />
                                    <span >
                                        <span className="font-bold text-2xl text-gray-700">
                                            {day}
                                        </span>
                                        <span className="font-semibold text-lg px-1">
                                            {dayOfWeek}
                                        </span>
                                    </span>
                                    <div className="text-sm ml-5 mt-2">Check Your Deadlines</div>
                                </div>
                            </ListItem>
                        </Link>
                    </Tooltip>
                    <Divider />
                    {/* Chat  */}
                    <Tooltip title="Chats">
                        <Link to="/messages">
                            <ListItem className="my-3">
                                <div className="flex "><MarkChatUnreadIcon color="action" /><span className="pl-4 font-bold"> Chats</span></div>
                            </ListItem>
                        </Link>
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
                            <BottomNavigationAction href="/" label="Home" icon={<HomeIcon />} />
                        </Tooltip>
                        <Tooltip title="Projects">
                            <BottomNavigationAction href="/project" label="Projects" icon={<CollectionsBookmarkIcon />} />
                        </Tooltip>
                        <Tooltip title="Check your deadlines">
                            <BottomNavigationAction href="/calendar" label="Calendar" icon={<CalendarMonthIcon />} />
                        </Tooltip>
                        <Tooltip title="Chats">
                            <BottomNavigationAction href="/messages" label="Messages" icon={<MarkChatUnreadIcon />} />
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

export default SideBar
