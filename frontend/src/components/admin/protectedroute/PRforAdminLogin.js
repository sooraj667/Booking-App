import React,{useState} from 'react'
import { Navigate } from "react-router-dom";
import LoginpageAd from '../../../pages/admin/login/LoginpageAd';
import Cookies from 'js-cookie';

const PRforAdminLogin = () => {
    const [adminaccessToken,setAdminaccessToken]=useState(Cookies.get("accesstoken-Ad"))
  return (
    !adminaccessToken? <LoginpageAd/> :<Navigate to="admindashboard" replace/>
  )
}

export default PRforAdminLogin