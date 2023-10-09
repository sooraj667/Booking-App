import React,{useState} from 'react'
import { Navigate } from "react-router-dom";
import Loginbeauticianpage from '../../../../pages/users/login/Loginbeauticianpage';
import Cookies from 'js-cookie';


const PRforBeauticianLogin = () => {
    const [accessTokenB,setAccessTokenB]=useState(Cookies.get("accesstoken-B")) 
  return (
    !accessTokenB? <Loginbeauticianpage/> : <Navigate to="/beautician-dashboard" replace />
  )
}

export default PRforBeauticianLogin