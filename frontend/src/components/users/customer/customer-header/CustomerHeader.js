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

import WorkshopDrawer from '../workshops/WorkshopDrawer';


const CustomerHeader = () => {
    const navigate=useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("singledetails-C");
        localStorage.removeItem("allbeauticians-C");
        Cookies.remove("accesstoken-C");
        navigate("../logincustomer")
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
          
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="groomup">
          Groom Up
          </Link>
         
          </Typography>
          <div className="cur">
            <WorkshopDrawer/>   
          {/* ONLINE WORKSHOPS <ArrowDropDownIcon className='mr-3 cur'/> */}

          </div>
           
    


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

export default CustomerHeader