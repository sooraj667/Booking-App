import React from 'react'
import Cookies from "js-cookie";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';



const BeauticianHeader = () => {
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#202331",
        
       
        }}
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="groomup">
          Groom Up
          </Link>
          </Typography>
    


                <Button
                  className="mr-3"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    color: "white",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
        
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default BeauticianHeader