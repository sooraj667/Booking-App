import React from "react";
import { Link } from "react-router-dom";
import "./HeaderAd.css"
import Cookies from "js-cookie";
const HeaderAd = () => {
    const handleLogout=()=>{
    localStorage.removeItem("admindetails")
    Cookies.remove("accesstoken-Ad")
  }
  return (
    <div className="headerAd">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="#">
          Admin Dashboard
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
            <li class="nav-item active">
              <a class="nav-link" href="#">
                <Link to="/adminlogin">
                  <button className="btn navbtnAd" onClick={handleLogout}>
                  
                    Logout
                  </button>
                </Link>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">
                <img
                  className="profileimage"
                  src="https://m.media-amazon.com/images/M/MV5BNWRkMDdjNTYtYTk5ZS00ZThlLTlhMDctZGQ1YTI1NjE0MGUwXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg"
                  alt=""
                />
              </a>
            </li>

            
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default HeaderAd;
