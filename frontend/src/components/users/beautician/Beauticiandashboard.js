import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBeautDetails,setAccessToken } from "../../../feautures/loginslice";
import Header from "../header/Header";
import Cookies from "js-cookie";
import Contents from "./Contents";
import HeaderDashboard from "../header/HeaderDashboard";
const Beauticiandashboard = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.login);


  useEffect(() => {
    const beautDetails = localStorage.getItem("singledetails-B");
    if (beautDetails) {
      const parsed=JSON.parse(beautDetails)
      dispatch(setBeautDetails(parsed));
    }
  },[]);
  
  
  
  return (
    <div>
        <HeaderDashboard/>
        <div className="row">
          <div className="col-md-3">
          <Contents/>

          </div>
          <div className="col-md-9">
          {details.value.beautdetails.email}
            
          </div>



        </div>
        
  
      
  
    </div>
  );
};

export default Beauticiandashboard;
