import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
const Header = () => {
  
  const datas = useSelector((state) => state.login);
 
  const handleLogout=()=>{
    localStorage.removeItem("singledetails-B")
    Cookies.remove("accesstoken-B")
  }
  return ( 
    <div className="header">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="#">
          GroomUp
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            {datas.value.accesstoken ? (
              <>
              
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  <Link to="/loginbeautician">
                    <button className="btn navbtn" onClick={handleLogout}> Logout</button>
                  </Link>
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="#">
               
                  <img className="profileimage" src="https://m.media-amazon.com/images/M/MV5BNWRkMDdjNTYtYTk5ZS00ZThlLTlhMDctZGQ1YTI1NjE0MGUwXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg" alt="" />
                 
                </a>
              </li>

              </>
              
            ) : (
              <>
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    <Link to="/signup">
                      <Button variant="outlined"> Sign up</Button>
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <Link to="/login">
                      <Button variant="outlined">Login</Button>
                    </Link>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
