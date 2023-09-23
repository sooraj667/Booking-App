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
import {setAccessTokenB,setAccessTokenC} from "../src/feautures/loginslice"
import Cookies from "js-cookie"
import Customerpage from "./pages/users/customer/Customerpage";
import LoginpageAd from "./pages/admin/login/LoginpageAd";
import DashboardpageAd from "./pages/admin/dashboard/DashboardpageAd";
import Customerdashboard from "./components/users/customer/Customerdashboard";
import Otppage from "./components/users/otp/Otppage";

const Allroutes = () => {
  const dispatch =useDispatch()
  const accesstokenB = useSelector((state) => state.login.value.accesstokenB);
  const accesstokenC = useSelector((state) => state.login.value.accesstokenC);
  console.log(accesstokenB,"CROUTES");
  
  useEffect(()=>{
    const accesstokenBeaut=Cookies.get('accesstoken-B')
    const accesstokenCust=Cookies.get('accesstoken-C')
    console.log("ADICHITEENNN")
    
   
    if (accesstokenBeaut){
        
        dispatch(setAccessTokenB(accesstokenBeaut))
    }
    if (accesstokenCust){
        
        dispatch(setAccessTokenC(accesstokenCust))
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

            <Route path="/otp" element={<Otppage />} />

            
            
            {
                !accesstokenC?<Route path="/logincustomer" element={<Logincustomerpage />} />
                :null
            }
            {
                !accesstokenB?<Route path="/loginbeautician" element={<Loginbeauticianpage />} />
                :null
            }
            {/* <Route path="/beautician-dashboard" element={<Beauticianpage />} /> */}
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
