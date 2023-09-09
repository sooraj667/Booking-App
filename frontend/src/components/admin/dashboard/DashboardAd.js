import React from "react";
import HeaderAd from "../header/HeaderAd";
import ContentAd from "./ContentAd";
import BeauticianManage from "./beautician/BeauticianManage";
import { useSelector } from "react-redux";
import CustomerManage from "./customer/CustomerManage";
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
            

        </div>
      </div>
    </div>
  );
};

export default DashboardAd;
