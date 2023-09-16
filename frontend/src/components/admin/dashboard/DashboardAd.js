import React from "react";
import HeaderAd from "../header/HeaderAd";
import ContentAd from "./ContentAd";
import BeauticianManage from "./beautician/BeauticianManage";
import { useSelector } from "react-redux";
import CustomerManage from "./customer/CustomerManage";

import ServicesAdmin from "../services/ServicesAdmin";
const DashboardAd = () => {
    const datas=useSelector((state)=>state.adminnavigation)
  return (
    <div>
      <HeaderAd />
      <div className="row">
        <div className="col-md-3"><ContentAd/></div>
        <div className="col-md-9">
            {datas.value.beaut===true && <BeauticianManage/>}
            {datas.value.cust===true && <CustomerManage  />}
            {datas.value.services===true && <ServicesAdmin  />}
           
            
        </div>
      </div>
    </div>
  );
};

export default DashboardAd;
