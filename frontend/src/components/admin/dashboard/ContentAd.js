import React from 'react'
import { useDispatch } from 'react-redux'
import {toggleBeaut,toggleCust,toggleServices,toggleAppointments, toggleWorkshops} from "../../../feautures/adminnavigationslice"
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import BookIcon from "@mui/icons-material/Book";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Person3Icon from '@mui/icons-material/Person3';
import Person4Icon from '@mui/icons-material/Person4';
import ViewListIcon from '@mui/icons-material/ViewList';
import TaskIcon from '@mui/icons-material/Task';
import GroupsIcon from '@mui/icons-material/Groups';




const ContentAd = () => {
    const dispatch=useDispatch()
  return (
    <Paper
      sx={{
        height: "950px",
        position:"fixed",
        width: "250px",
        backgroundColor: "blue",
        borderRadius: "0px",
        backgroundColor: "whitesmoke",
        // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
        objectFit: "cover",
        backgroundRepeat: "no-repeat",

        opacity: [0.9, 0.8, 0.8],

        "&:hover": {
          backgroundColor: "whitesmoke",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <ListItem sx={{cursor:"pointer"}} onClick={() => dispatch(toggleBeaut())}>
          <ListItemAvatar>
            <Avatar>
              <Person3Icon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Beauticians" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem sx={{cursor:"pointer"}} onClick={() => dispatch(toggleCust())}>
          <ListItemAvatar>
            <Avatar>
              <Person4Icon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Customers" secondary="Jan 7, 2014" />
        </ListItem>
        <Divider variant="inset" component="li" />
        {/* <ListItem onClick={() => dispatch(toggleBrowse())}>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Browse" secondary="Jan 7, 2014" />
        </ListItem> */}
        <Divider variant="inset" component="li" />
        <ListItem sx={{cursor:"pointer"}} onClick={() => dispatch(toggleServices())}>
          <ListItemAvatar>
            <Avatar>
              <ViewListIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Services" secondary="July 20, 2014" />
        </ListItem>
        
        <Divider variant="inset" component="li" />
        <ListItem sx={{cursor:"pointer"}} onClick={() => dispatch(toggleAppointments())}>
          <ListItemAvatar>
            <Avatar>
              <TaskIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Appointments" secondary="July 20, 2014" />
        </ListItem>

        <Divider variant="inset" component="li" />
        <ListItem sx={{cursor:"pointer"}} onClick={() => dispatch(toggleWorkshops())}>
          <ListItemAvatar>
            <Avatar>
              <GroupsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Workshops" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </Paper>
  )
}

export default ContentAd