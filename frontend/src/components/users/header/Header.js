import React from "react";
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

const Header = () => {
  const datas = useSelector((state) => state.login);

  const handleLogout = () => {
    localStorage.removeItem("singledetails-B");
    localStorage.removeItem("allservices-B");
    localStorage.removeItem("services-B");
    localStorage.removeItem("expertin-B");
    Cookies.remove("accesstoken-B"); 
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#0c0335",
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
    

          {datas.value.accesstoken ? (
            <>
              <Link to="/loginbeautician">
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
          ) : (
            <>
              <Link to="/signup">
                <Button
                  className="mr-3"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    color: "white",
                  }}
                >
                  Signup
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    color: "white",
                  }}
                >
                  Login
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    // <div className="header">
    //   <nav class="navbar navbar-expand-lg navbar-dark">
    //     <a class="navbar-brand" href="#">
    //       GroomUp
    //     </a>
    //     <button
    //       class="navbar-toggler"
    //       type="button"
    //       data-toggle="collapse"
    //       data-target="#navbarNav"
    //       aria-controls="navbarNav"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span class="navbar-toggler-icon"></span>
    //     </button>

    //     <div class="collapse navbar-collapse" id="navbarNav">
    //       <ul class="navbar-nav ml-auto">
    //         {datas.value.accesstoken ? (
    //           <>

    //           <li class="nav-item active">
    //             <a class="nav-link" href="#">
    //               <Link to="/loginbeautician">
    //                 <button className="btn navbtn" onClick={handleLogout}> Logout</button>
    //               </Link>
    //             </a>
    //           </li>
    //           <li class="nav-item active">
    //             <a class="nav-link" href="#">

    //               <img className="profileimage" src="https://m.media-amazon.com/images/M/MV5BNWRkMDdjNTYtYTk5ZS00ZThlLTlhMDctZGQ1YTI1NjE0MGUwXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg" alt="" />

    //             </a>
    //           </li>

    //           </>

    //         ) : (
    //           <>
    //             <li class="nav-item active">
    //               <a class="nav-link" href="#">
    //                 <Link to="/signup">
    //                   <Button variant="outlined"> Sign up</Button>
    //                 </Link>
    //               </a>
    //             </li>
    //             <li class="nav-item">
    //               <a class="nav-link" href="#">
    //                 <Link to="/login">
    //                   <Button variant="outlined">Login</Button>
    //                 </Link>
    //               </a>
    //             </li>
    //           </>
    //         )}
    //       </ul>
    //     </div>
    //   </nav>
    // </div>
  );
};

export default Header;
