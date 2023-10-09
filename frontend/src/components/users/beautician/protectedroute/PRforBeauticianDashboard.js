import React,{useState} from 'react'
import { Navigate } from "react-router-dom";
import Beauticianpage from '../../../../pages/users/beautician/Beauticianpage';
import Cookies from 'js-cookie';

const PRforBeauticianDashboard = () => {
    const [accessTokenB,setAccessTokenB]=useState(Cookies.get("accesstoken-B")) 
  return (
    accessTokenB? <Beauticianpage/> : <Navigate to="/loginbeautician" replace />
  )
}

export default PRforBeauticianDashboard