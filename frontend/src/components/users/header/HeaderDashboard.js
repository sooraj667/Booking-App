import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
const HeaderDashboard = () => {
    const datas=useSelector((state)=>state.login)
    const handleLogoutB=()=>{
        localStorage.removeItem("singledetails-B")
        Cookies.remove("accesstoken-B")
      }
      const handleLogoutC=()=>{
        localStorage.removeItem("singledetails-C")
        Cookies.remove("accesstoken-C")
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
            {datas.value.accesstoken && (
              <>
              
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  <Link to="/loginbeautician">
                    <button className="btn navbtn" onClick={handleLogoutB}> LogoutB</button>
                  </Link>
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="#">
               
                  <img className="profileimage" src="https://m.media-amazon.com/images/M/MV5BNWRkMDdjNTYtYTk5ZS00ZThlLTlhMDctZGQ1YTI1NjE0MGUwXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg" alt="" />
                 
                </a>
              </li>

              </>
              
            ) }


            {
                datas.value.accesstokenC && (
                    <>
                    
                    <li class="nav-item active">
                      <a class="nav-link" href="#">
                        <Link to="/logincustomer">
                          <button className="btn navbtn" onClick={handleLogoutC}> LogoutC</button>
                        </Link>
                      </a>
                    </li>
                    <li class="nav-item active">
                      <a class="nav-link" href="#">
                     
                        <img className="profileimage" src="https://m.media-amazon.com/images/M/MV5BNWRkMDdjNTYtYTk5ZS00ZThlLTlhMDctZGQ1YTI1NjE0MGUwXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_.jpg" alt="" />
                       
                      </a>
                    </li>
      
                    </>
                    
                  ) 

            }
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default HeaderDashboard