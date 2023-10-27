import React from "react";
import HeaderAd from "../header/HeaderAd";
import ContentAd from "./ContentAd";
import BeauticianManage from "./beautician/BeauticianManage";
import { useSelector } from "react-redux";
import CustomerManage from "./customer/CustomerManage";

import ServicesAdmin from "../services/ServicesAdmin";
import Appointments from "./appointments/Appointments";
import WorkshopsManage from "./workshops/WorkshopsManage";
const DashboardAd = () => {
    const datas=useSelector((state)=>state.adminnavigation)
  return (
    <div>
      <HeaderAd />
      <div  className="row mart ">
        <div className="col-md-3"><ContentAd/></div>
        <div className="col-md-9">
            {datas.value.beaut===true && <BeauticianManage/>}
            {datas.value.cust===true && <CustomerManage  />}
            {datas.value.services===true && <ServicesAdmin  />}
            {datas.value.appointments===true && <Appointments  />}
            {datas.value.workshops===true && <WorkshopsManage  />}
           
            
        </div>
      </div>
    </div>
  );
};

export default DashboardAd;
