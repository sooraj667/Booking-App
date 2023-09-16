import React from 'react'
import "./Header.css";
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

const HeaderAdmin = () => {
    const datas = useSelector((state) => state.adminlogin);

    const handleLogout = () => {
        localStorage.removeItem("allcustdatas")
        localStorage.removeItem("admindetails")
        localStorage.removeItem("allbeautdatas")
        localStorage.removeItem("allservices")
        console.log("Ivan working ahnenn thonan");
      Cookies.remove("accesstoken-Ad"); 
    };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0c0335",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
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
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default HeaderAdmin