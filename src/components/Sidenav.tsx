/** @format */

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ProjectIcon from "../assets/icons/ProjectIcon.png";
import ChatIcon from "../assets/icons/ChatIcon.png";
import { useEffect, useState } from "react";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const style = {
    border: "none",
    boxShadow: 'none',
    innerHeight: '20px',
  };

    const [currentDate, setCurrentDate] = useState(new Date());
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');

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

  const drawer = (
    <div>
      <Toolbar />
      <List >
        <ListItem>
          {/* Organization Name */}
          <Typography>
            <div className="text-2xl font-bold -mt-12">Organize.</div>
          </Typography>
        </ListItem>
        <Divider />
        {/* Project Accordion */}
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "black", alignItems:"end" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="flex"><span><img src={ProjectIcon} width={25} height={25}/></span><span className="pl-3 font-bold"> Projects</span></div>
          </AccordionSummary>
          <AccordionDetails><div className="hover:border-l-4 h-full hover:border-[#FF0000] pl-7 hover:bg-[#E8E8E8] p-1">Project1</div></AccordionDetails>
          <AccordionDetails><div className="hover:border-l-4 h-full hover:border-[#FF0000] pl-7 hover:bg-[#E8E8E8] p-1">Project2</div></AccordionDetails>
        </Accordion>
        <Divider />
        {/* Calendar */}
        <ListItem>
        <div className="py-4">
          <span className="font-bold text-2xl ">
            {month}
          </span>
          <br />
          <span >
            <span className="font-bold text-8xl ">
              {day}
            </span>
            <span className="font-bold text-xl">
              {dayOfWeek}
            </span>
          </span>
        </div>
        </ListItem>
        <Divider />
        {/* Chat  */}

         <Accordion sx={style}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="flex "><span><img src={ChatIcon} width={25} height={25}/></span><span className="pl-4 font-bold"> Chats</span></div>
          </AccordionSummary>
          <AccordionDetails><div className="border-l-4 h-full border-[#2457C5] px-3 hover:bg-[#E8E8E8] p-2">Saakshi Raut</div></AccordionDetails>
        </Accordion>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

 
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
