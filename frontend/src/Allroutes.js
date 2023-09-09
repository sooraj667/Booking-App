import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/users/Homepage";
import Signuplandingpage from "./pages/users/signup/Signuplandingpage";
import Loginlandingpage from "./pages/users/login/Loginlandingpage";
import Signupbeauticianpage from "./pages/users/signup/Signupbeauticianpage";
import Signupcustomerpage from "./pages/users/signup/Signupcustomerpage";
import Loginbeauticianpage from "./pages/users/login/Loginbeauticianpage";
import Logincustomerpage from "./pages/users/login/Logincustomerpage";
import Beauticianpage from "./pages/users/beautician/Beauticianpage";
import { useDispatch, useSelector } from "react-redux";
import {setAccessToken,setAccessTokenC} from "../src/feautures/loginslice"
import Cookies from "js-cookie"
import Customerpage from "./pages/users/customer/Customerpage";
import LoginpageAd from "./pages/admin/login/LoginpageAd";
import DashboardpageAd from "./pages/admin/dashboard/DashboardpageAd";

const Allroutes = () => {
  const dispatch =useDispatch()
  const accesstokenB = useSelector((state) => state.login.value.accesstoken);
  const accesstokenC = useSelector((state) => state.login.value.accesstokenC);
  console.log(accesstokenC,"CROUTES");
  
  useEffect(()=>{
    const accesstoken=Cookies.get('accesstoken-B')
    const accesstokenC=Cookies.get('accesstoken-C')
    
   
    if (accesstoken){
        
        dispatch(setAccessToken(accesstoken))
    }
    if (accesstokenC){
        
        dispatch(setAccessTokenC(accesstokenC))
    }
  },[])
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="" element={<Homepage />} />
            <Route path="/signup" element={<Signuplandingpage />} />
            <Route path="/login" element={<Loginlandingpage />} />
            <Route
              path="/signupbeautician"
              element={<Signupbeauticianpage />}
            />
            <Route path="/signupcustomer" element={<Signupcustomerpage />} />
            <Route path="/loginbeautician" element={<Loginbeauticianpage />} />
            <Route path="/logincustomer" element={<Logincustomerpage />} />
            {
                accesstokenB?<Route path="/beautician-dashboard" element={<Beauticianpage />} />:null
            }
            {
                accesstokenC?<Route path="/customer-dashboard" element={<Customerpage />} />:null
            }


            
            <Route path="/adminlogin" element={<LoginpageAd />} />
            <Route path="/admindashboard" element={<DashboardpageAd />} />
            
            
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Allroutes;
