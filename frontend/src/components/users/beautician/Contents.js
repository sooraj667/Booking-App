import React,{useState} from "react";
import { useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import {toggleServices,toggleAppointments,toggleProfile,toggleStudio,toggleWallet,toggleWorkshops,toggleHome} from "../../../feautures/beautician/beautnavigationslice"
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import  Button  from "@mui/material/Button";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupsIcon from '@mui/icons-material/Groups';


const Contents = () => {
  const [accessToken,setAccessToken]=useState(Cookies.get("accesstoken-B"))
  const dispatch=useDispatch()
  const statedatas=useSelector((state)=>state.login)
  const navigate=useNavigate()


  const handleLogout = () => {
    localStorage.removeItem("singledetails-B");
    localStorage.removeItem("allservices-B");
    localStorage.removeItem("services-B");
    localStorage.removeItem("expertin-B");
    Cookies.remove("accesstoken-B");
    navigate("../loginbeautician")
  };
  return (
    <>
    <div className="dp">
    <Avatar
        sx={{ width: 100, height: 100 }}
              src={statedatas.value.beautdetails.image}
        >

        </Avatar>

      

    </div>
    <div className="name">
      {statedatas.value.beautdetails.name}

    </div>

    <div class="divide"></div>
    <ul className="sidebarlist">


    <li className="item" onClick={() => dispatch(toggleHome())}>
        <div className="col-md-3">
          <div class="icon">
            <HomeIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Home</div>
        </div>
      </li>

   



      <li className="item" onClick={() => dispatch(toggleAppointments())}>
        <div className="col-md-3">
          <div class="icon">
            <BookIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Appointments</div>
        </div>
      </li>
      <li className="item" onClick={() => dispatch(toggleProfile())}>
        <div className="col-md-3">
          <div class="icon">
            <AccountBoxIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Profile</div>
        </div>
      </li>

      <li className="item" onClick={() => dispatch(toggleServices())}>
        <div className="col-md-3">
          <div class="icon">
            <ContentCutIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Services</div>
        </div>
      </li>



      <li className="item" onClick={() => dispatch(toggleStudio())}>
        <div className="col-md-3">
          <div class="icon">
            <StoreIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Studio</div>
        </div>
      </li>

      <li className="item" onClick={() => dispatch(toggleWorkshops())}>
        <div className="col-md-3">
          <div class="icon">
            <GroupsIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Workshops</div>
        </div>
      </li>




      <li className="item" onClick={() => dispatch(toggleWallet())}>
        <div className="col-md-3">
          <div class="icon">
            <AccountBalanceWalletIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Wallet</div>
        </div>
      </li>

    </ul>
    {/* {
      accessToken &&
      <div className="logout">
      <Button onClick={handleLogout} sx={{backgroundColor:"#b23b3b",color:"#D0D4D9"}} >
        Logout

      </Button>

    </div>
    } */}
    
    

    </>
    
  );
};

export default Contents;





















{/* <Paper
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
        <ListItem sx={{ cursor: "pointer" }} onClick={()=>dispatch(toggleStudio())}>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Studio" secondary="July 20, 2014" />
        </ListItem>
    </Paper> */}
