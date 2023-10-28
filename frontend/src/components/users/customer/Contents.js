import React,{useEffect,useState} from "react";
// import "./Contents.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import BookIcon from "@mui/icons-material/Book";
import Person2Icon from "@mui/icons-material/Person2";
import ExploreIcon from "@mui/icons-material/Explore";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { useDispatch } from "react-redux";
import {
  toggleBookings,
  toggleFavouritestylists,
  toggleBrowse,
  toggleProfile,
  toggleWallet
} from "../../../feautures/customer/customernavigationslice";
import Button  from "@mui/material/Button";
import "./Contents.css"
import Cookies from "js-cookie";
import { red } from "@mui/material/colors";
import {toggleLandingPart} from "../../../feautures/customer/customernavigationslice"
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupsIcon from '@mui/icons-material/Groups';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Contents = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const[accessToken,setAccessToken]=useState(Cookies.get("accesstoken-C"))
  const statedatas = useSelector((state) => state.login);




  // useEffect(
  //   ()=>{
  //     atoken=Cookies.get("accesstoken-C")
      


  //   },[]
  // )

  const handleLogout = () => {
    localStorage.removeItem("singledetails-C");
    localStorage.removeItem("allbeauticians-C");
    Cookies.remove("accesstoken-C");
    navigate("../logincustomer")
  };


  const handleHomeClick=()=>{
    dispatch(toggleLandingPart())
  }


  return (
    <>
    <div className="dp">
    <Avatar
        sx={{ width: 100, height: 100 }}
              src={statedatas.value.custdetails.image}
        >

        </Avatar>

      

    </div>
    <div className="name">
      {statedatas.value.custdetails.name}

    </div>

    <div class="divide"></div>
    <ul className="sidebarlist">

    <li className="item" onClick={handleHomeClick}>
        <div className="col-md-3">
          <div class="icon">
            <HomeIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Home</div>
        </div>
      </li>



      <li className="item" onClick={() => dispatch(toggleBookings())}>
        <div className="col-md-3">
          <div class="icon">
            <BookIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Bookings</div>
        </div>
      </li>
      <li className="item" onClick={() => dispatch(toggleProfile())}>
        <div className="col-md-3">
          <div class="icon">
            <Person2Icon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Profile</div>
        </div>
      </li>
      <li className="item" onClick={() => dispatch(toggleBrowse())}>
        <div className="col-md-3">
          <div class="icon">
            <ExploreIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Explore</div>
        </div>
      </li>

      <li className="item" onClick={() => dispatch(toggleFavouritestylists())}>
        <div className="col-md-3">
          <div class="icon">
            <FavoriteIcon />
          </div>
        </div>
        <div className="col-md-9">
          <div class="title">Favourites</div>
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

    // <div className="row ">
    //   <Box
    //     sx={{
    //       display:"flex",
    //       height: "100vh",
    //       width: "100%",
    //       borderRadius: "0px",
    //       backgroundColor: "inherit",
    //       // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
    //       objectFit: "cover",
    //       backgroundRepeat: "no-repeat",
    //       margin: 0,

    //       opacity: [0.9, 0.8, 0.8],

    //       "&:hover": {
    //         backgroundColor: "inherit",
    //         opacity: [0.9, 0.8, 0.7],
    //       },
    //     }}
    //   >
    //     <List
    //       sx={{
    //         width: "100%",
    //         maxWidth: 360,
    //         bgcolor: "inherit",
    //       }}
    //     >
    //       {/* <ListItem sx={{ cursor: "pointer" }} onClick={() => dispatch(toggleFavouritestylists())}>
    //       <ListItemAvatar>
    //         <Avatar>
    //           <BookIcon />
    //         </Avatar>
    //       </ListItemAvatar>
    //       <ListItemText primary="Favourite Stylists" />
    //     </ListItem> */}
    //       <Avatar
    //         sx={{ width: 40, height: 40 }}
    //         src={statedatas.value.custdetails.image}
    //       ></Avatar>
    //       <Divider variant="inset" component="li" />
    //       <ListItem
    //         sx={{ cursor: "pointer", color: "white" }}
    //         onClick={() => dispatch(toggleBookings())}
    //       >
    //         <ListItemAvatar>
    //           <Avatar>
    //             <WorkIcon sx={{ color: "white" }} />
    //           </Avatar>
    //         </ListItemAvatar>
    //         <ListItemText primary="Bookings" />
    //       </ListItem>
    //       <Divider variant="inset" component="li" sx={{ color: "white" }} />
    //       <ListItem
    //         sx={{ cursor: "pointer", color: "white" }}
    //         onClick={() => dispatch(toggleBrowse())}
    //       >
    //         <ListItemAvatar>
    //           <Avatar>
    //             <WorkIcon />
    //           </Avatar>
    //         </ListItemAvatar>
    //         <ListItemText primary="Browse" />
    //       </ListItem>
    //       <Divider variant="inset" component="li" />
    //       <ListItem
    //         sx={{ cursor: "pointer", color: "white" }}
    //         onClick={() => dispatch(toggleProfile())}
    //       >
    //         <ListItemAvatar>
    //           <Avatar>
    //             <BeachAccessIcon />
    //           </Avatar>
    //         </ListItemAvatar>
    //         <ListItemText primary="Profile" />
    //       </ListItem>
    //     </List>
    //   </Box>
    // </div>
  );
};

export default Contents;
