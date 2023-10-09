import React,{useState} from 'react'
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";
import Logincustomerpage from '../../../../pages/users/login/Logincustomerpage';

const PRforLogin = () => {
    const [accessTokenC,setAccessTokenC]=useState(Cookies.get("accesstoken-C")) 
  return (
    !accessTokenC? <Logincustomerpage/>: <Navigate to="/customer-dashboard" replace/>


  )
}

export default PRforLogin