import React,{ useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {setAccessTokenB,setAccessTokenC} from "../../../feautures/loginslice"
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
const HeaderDashboard = () => {
  const dispatch=useDispatch()
  const datas = useSelector((state) => state.login);
  const handleLogoutB = () => {
    localStorage.removeItem("singledetails-B");
    localStorage.removeItem("expertin-B");
    Cookies.remove("accesstoken-B");
  };
  const handleLogoutC = () => {
    localStorage.removeItem("singledetails-C");
    localStorage.removeItem("allbeauticians-C");
    Cookies.remove("accesstoken-C");
  };

  useEffect(()=>{
    const accesstokenB=Cookies.get('accesstoken-B')
    const accesstokenC=Cookies.get('accesstoken-C')
    
   
    if (accesstokenB){
        
        dispatch(setAccessTokenB(accesstokenB))
    }
    if (accesstokenC){
        
        dispatch(setAccessTokenC(accesstokenC))
    }
  },[])
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
            Groom Up
          </Typography>

          {/* <Link to="/loginbeautician">
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                color: "white",
              }}
              onClick={handleLogoutB}
            >
              LogoutB
            </Button>
          </Link> */}

          {datas.value.accesstokenB && (
            <>
              <Link to="/loginbeautician">
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ 
                    color: "white",
                  }}
                  onClick={handleLogoutB}
                >
                  LogoutB
                </Button>
              </Link>
            </>
          )}

          {datas.value.accesstokenC && (
            <>
              <Link to="/logincustomer">
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    color: "white",
                  }}
                  onClick={handleLogoutC}
                >
                  LogoutC
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
    //         {datas.value.accesstoken && (
    //           <>

    //           <li class="nav-item active">
    //             <a class="nav-link" href="#">
    //               <Link to="/loginbeautician">
    //                 <button className="btn navbtn" onClick={handleLogoutB}> LogoutB</button>
    //               </Link>
    //             </a>
    //           </li>
    //           <li class="nav-item active">
    //             <a class="nav-link" href="#">

    //               <img className="profileimage" src="https://m.media-amazon.com/images/M/MV5BNWRkMDdjNTYtYTk5ZS00ZThlLTlhMDctZGQ1YTI1NjE0MGUwXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg" alt="" />

    //             </a>
    //           </li>

    //           </>

    //         ) }

    //         {
    //             datas.value.accesstokenC && (
    //                 <>

    //                 <li class="nav-item active">
    //                   <a class="nav-link" href="#">
    //                     <Link to="/logincustomer">
    //                       <button className="btn navbtn" onClick={handleLogoutC}> LogoutC</button>
    //                     </Link>
    //                   </a>
    //                 </li>
    //                 <li class="nav-item active">
    //                   <a class="nav-link" href="#">

    //                     <img className="profileimage" src="https://m.media-amazon.com/images/M/MV5BNWRkMDdjNTYtYTk5ZS00ZThlLTlhMDctZGQ1YTI1NjE0MGUwXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg" alt="" />

    //                   </a>
    //                 </li>

    //                 </>

    //               )

    //         }
    //       </ul>
    //     </div>
    //   </nav>
    // </div>
  );
};

export default HeaderDashboard;
