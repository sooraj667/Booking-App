import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBeautDetails,setAccessToken,setExpertIn,setServices,setAllservices } from "../../../feautures/loginslice";
import Header from "../header/Header";
import Cookies from "js-cookie";
import Contents from "./Contents";
import HeaderDashboard from "../header/HeaderDashboard";
import Landingpartbeaut from "./Landingpartbeaut";
import Services from "./services/Services";

const Beauticiandashboard = () => {
  const statedatas=useSelector((state)=>state.beautnavigation)
  const dispatch = useDispatch();
  const details = useSelector((state) => state.login);
  const navigationdatas = useSelector((state) => state.beautnavigation);


  useEffect(() => {
    const beautDetails = localStorage.getItem("singledetails-B");
    const expertin = localStorage.getItem("expertin-B");
    const services=localStorage.getItem("services-B");
    const allservices=localStorage.getItem("allservices-B");
    if (beautDetails) {
      const parsed=JSON.parse(beautDetails)
      dispatch(setBeautDetails(parsed));
    }
    if (expertin) {
      const parsedexpert=JSON.parse(expertin)
      dispatch(setExpertIn(parsedexpert));
    }
    if (services) {
      const parsedservices=JSON.parse(services)
      dispatch(setServices(parsedservices));
    }
    if (allservices) {
      const parsedallservices=JSON.parse(allservices)
      dispatch(setAllservices(parsedallservices));
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
          {
            navigationdatas.value.landingpart && <Landingpartbeaut/>
          }
         
          {
            navigationdatas.value.services && <Services/>

          }
          
         
            
          </div>



        </div>
        
  
      
  
    </div>
  );
};

export default Beauticiandashboard;
