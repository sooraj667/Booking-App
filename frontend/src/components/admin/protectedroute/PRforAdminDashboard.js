import React,{useState} from 'react'
import { Navigate } from "react-router-dom";
import DashboardpageAd from '../../../pages/admin/dashboard/DashboardpageAd';
import Cookies from 'js-cookie';

const PRforAdminDashboard = () => {
    const [adminaccessToken,setAdminaccessToken]=useState(Cookies.get("accesstoken-Ad"))

  return (
    adminaccessToken? <DashboardpageAd/> :<Navigate to="adminlogin" replace/>

  )
}

export default PRforAdminDashboard