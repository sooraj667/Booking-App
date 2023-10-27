import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBeautDetails,
  setAccessToken,
  setExpertIn,
  setServices,
  setAllservices,
} from "../../../feautures/loginslice";
import Header from "../header/Header";
import Cookies from "js-cookie";
import Contents from "./Contents";
import HeaderDashboard from "../header/HeaderDashboard";
import Landingpartbeaut from "./Landingpartbeaut";
import Services from "./services/Services";
import Profile from "./profile/Profile";
import Appointments from "./appointments/Appointments";
import Studio from "./studio/Studio";
import axiosInstance from "../../../axios/axiosconfig";
import { useState } from "react";
import WalletBeaut from "./wallet/WalletBeaut";
import PreviousBeautBookings from "./appointments/PreviousBeautBookings";
import BeauticianHeader from "./beautician-header/BeauticianHeader";
import Workshops from "./workshops/Workshops";
import ConductedWorkshops from "./workshops/ConductedWorkshops";

const Beauticiandashboard = () => {
  const statedatas = useSelector((state) => state.beautnavigation);
  const dispatch = useDispatch();
  const details = useSelector((state) => state.login);
  const navigationdatas = useSelector((state) => state.beautnavigation);
  const logindatas = useSelector((state) => state.login);

  useEffect(() => {
    const beautDetails = localStorage.getItem("singledetails-B");
    // const expertin = localStorage.getItem("expertin-B");
    const services = localStorage.getItem("services-B");
    const allservices = localStorage.getItem("allservices-B");
    if (beautDetails) {
      const parsed = JSON.parse(beautDetails);
      dispatch(setBeautDetails(parsed));
    }
    // if (expertin) {
    //   const parsedexpert=JSON.parse(expertin)
    //   dispatch(setExpertIn(parsedexpert));
    // }
    if (services) {
      const parsedservices = JSON.parse(services);
      dispatch(setServices(parsedservices));
    }
    if (allservices) {
      const parsedallservices = JSON.parse(allservices);
      dispatch(setAllservices(parsedallservices));
    }
  }, []);

  // useEffect(
  //   ()=>{
  //     const datas={
  //       id:logindatas.value.beautdetails.id

  //     }
  //     axiosInstance.post("beaut/get-no-of-bookings/",datas).then((res)=>{
  //       console.log(res.data.count);
  //     }).catch((err)=>console.log("Error"))
  //   }
  // )

  return (
    <div class="beautouter">
      {/* <HeaderDashboard/> */}
      <div className="row outer">
        <BeauticianHeader />
        <div className="col-md-3 sidebar">
          <Contents />
        </div>
        <div className="col-md-9 rightsection">
          {navigationdatas.value.landingpart && <Landingpartbeaut />}

          {navigationdatas.value.services && <Services />}
          {navigationdatas.value.profile && <Profile />}
          {navigationdatas.value.appointments && <Appointments />}
          {navigationdatas.value.studio && <Studio />}
          {navigationdatas.value.wallet && <WalletBeaut />}
          {navigationdatas.value.previousbooking && <PreviousBeautBookings />}

          {navigationdatas.value.workshops && <Workshops />}
          {navigationdatas.value.conducted_workshops && <ConductedWorkshops />}
        </div>
      </div>
    </div>
  );
};

export default Beauticiandashboard;
