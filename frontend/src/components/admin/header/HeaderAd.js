import React, { useEffect } from 'react'
import "./HeaderAd.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {setAccessTokenAd} from "../../../feautures/adminloginslice";

const HeaderAd = () => {
    const datas = useSelector((state) => state.adminlogin);
    const dispatch=useDispatch()


    const handleLogout=()=>{
  
    localStorage.removeItem("allcustdatas")
    localStorage.removeItem("admindetails")
    localStorage.removeItem("allbeautdatas")
    localStorage.removeItem("allservices")
    Cookies.remove("accesstoken-Ad")
  }
  useEffect(
    ()=>{
      const admintoken=Cookies.get("accesstoken-Ad")
      dispatch(setAccessTokenAd(admintoken))

    },[]
  )
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
     
        sx={{
          backgroundColor: "#0c0335",
          marginBottom:20,
          

        }}
      >
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin
          </Typography>

          {datas.value.accesstokenAd && (
            <>
              <Link to="/adminlogin">
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  color="inherit"
                  sx={{
                    color: "white",
                  }}
                >
                  Logout
                </Button>
              </Link>
            </>
          ) }
          {console.log(datas.value.accesstokenAd)}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderAd;
