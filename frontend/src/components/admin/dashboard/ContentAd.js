import React from 'react'
import { useDispatch } from 'react-redux'
import {toggleBeaut,toggleCust,toggleServices} from "../../../feautures/adminnavigationslice"
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




const ContentAd = () => {
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
        <ListItem onClick={() => dispatch(toggleBeaut())}>
          <ListItemAvatar>
            <Avatar>
              <BookIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Beauticians" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem onClick={() => dispatch(toggleCust())}>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
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
        <ListItem onClick={() => dispatch(toggleServices())}>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Services" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </Paper>
  )
}

export default ContentAd