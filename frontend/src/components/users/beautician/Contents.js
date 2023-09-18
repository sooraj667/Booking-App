import React from "react";
import "./Contents.css";
import Paper from "@mui/material/Paper";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import BookIcon from '@mui/icons-material/Book';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import {toggleServices,toggleAppointments,toggleProfile} from "../../../feautures/beautician/beautnavigationslice"
import { useDispatch } from "react-redux";
const Contents = () => {
  const dispatch=useDispatch()
  return (
    <Paper
      sx={{
        height: "950px",
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
        <ListItem  sx={{ cursor: "pointer" }}  onClick={()=>dispatch(toggleAppointments())}>
          <ListItemAvatar>
            <Avatar>
              <BookIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Appointments"  />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem sx={{ cursor: "pointer" }} onClick={()=>dispatch(toggleServices())}>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Services" secondary="Jan 7, 2014" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem sx={{ cursor: "pointer" }} onClick={()=>dispatch(toggleProfile())}>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Profile" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Contents;
