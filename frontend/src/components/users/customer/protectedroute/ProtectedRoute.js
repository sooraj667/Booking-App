import React,{useState} from 'react'
import { Navigate } from "react-router-dom";
import Customerpage from '../../../../pages/users/customer/Customerpage';
import Cookies from 'js-cookie';
const ProtectedRoute = () => {
    const [accessTokenC,setAccessTokenC]=useState(Cookies.get("accesstoken-C")) 
  return (
    accessTokenC? <Customerpage/> : <Navigate to="/logincustomer" replace />


  )
}

export default ProtectedRoute