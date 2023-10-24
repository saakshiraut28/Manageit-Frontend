import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Typography, Toolbar, ListItem, List, Drawer, Divider, Modal, Accordion, AccordionDetails, AccordionSummary, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';

const SideBar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const style = {
        border: "none",
        boxShadow: 'none',
        innerHeight: '20px',
    };

    useEffect(() => {
        // Update the current date every second
        const interval = setInterval(() => {
            const date = new Date();
            setCurrentDate(date);
            setDay(date.getDate().toString());
            setMonth(date.toLocaleString('default', { month: 'long' }));
            setDayOfWeek(date.toLocaleString('default', { weekday: 'long' }));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {/* Left sidebar */}
            <div className="hidden lg:block w-1/5 h-screen">
                <Toolbar />
                <List >
                    <ListItem>
                        {/* Organization Name */}
                        <Typography>
                            <div className="text-2xl font-bold -mt-12">PushNote.</div>
                        </Typography>
                    </ListItem>
                    <Divider />
                    {/* Project Accordion */}
                    <Accordion sx={style}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: "black", alignItems: "end" }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className="flex"><CollectionsBookmarkIcon /><span className="pl-3 font-bold"> Projects</span></div>
                        </AccordionSummary>

                        <Link to="/project/project1">
                            <AccordionDetails className="accordion hover:border-l-4 hover:border-[#FF0000] hover:bg-[#E8E8E8] transition-all">Project1</AccordionDetails>
                        </Link>
                        <Link to="/project/project1">
                            <AccordionDetails className="accordion hover:border-l-4 hover:border-[#FF0000] hover:bg-[#E8E8E8] transition-all">Project2</AccordionDetails>
                        </Link>
                    </Accordion>
                    <Divider />
                    {/* Calendar */}
                    <Link to="/calendar">
                        <ListItem>
                            <div className="py-1">
                                <span className="font-semibold text-xl">
                                    {month}
                                </span>
                                <br />
                                <span >
                                    <span className="font-bold text-2xl">
                                        {day}
                                    </span>
                                    <span className="font-semibold text-lg">
                                        {dayOfWeek}
                                    </span>
                                </span>
                                <div className="text-sm ml-5 mt-2">Check Your Deadlines</div>
                            </div>
                        </ListItem>
                    </Link>
                    <Divider />
                    {/* Chat  */}
                    <Link to="/messages">
                        <ListItem className="mt-2">
                            <div className="flex "><MarkChatUnreadIcon /><span className="pl-4 font-bold"> Chats</span></div>
                        </ListItem>
                    </Link>
                </List>
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
                        <BottomNavigationAction href="/" label="Home" icon={<HomeIcon />} />
                        <BottomNavigationAction href="/project" label="Projects" icon={<CollectionsBookmarkIcon />} />
                        <BottomNavigationAction href="/calendar" label="Calendar" icon={<CalendarMonthIcon />} />
                        <BottomNavigationAction href="/messages" label="Messages" icon={<MarkChatUnreadIcon />} />
                    </BottomNavigation>
                </Paper>
            </div>
        </>
    )
}

export default SideBar
