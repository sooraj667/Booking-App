import React from 'react'
import {changeEmail,changePassword,setAccessTokenAd,setDetails} from "../../../feautures/adminloginslice"
import { useSelector,useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import axiosInstance from '../../../axios/axiosconfig'
import { useNavigate } from 'react-router-dom'

const LoginAd = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const formdatas=useSelector((state)=>state.adminlogin)
  const handleLogin=()=>{
    const datas={
      email:formdatas.value.email,
      password:formdatas.value.password
    }

    axiosInstance.post("adminside/login/",datas).then((response)=>{
      console.log(response.data);
      if (response.data.message=="Matched"){
     
          Cookies.set("accesstoken-Ad",response.data.accesstoken,{ expires: 7 })
          localStorage.setItem("admindetails",JSON.stringify(response.data.admindata))
          localStorage.setItem("allbeautdatas",JSON.stringify(response.data.allbeautdatas))
          navigate("../admindashboard")

      }
      else{
          alert("Credentials wrong")
      }
      
    }).catch((errro)=>{
      alert("error")
    })
  }
  return (
    <div className="container-fluid login-container">
      <div className="row justify-content-center align-items-center login-row">
        <div className="col-md-4 login-col">
          <h2 className="text-center">Admin Login</h2>
       
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                
                onChange={(e) => dispatch(changeEmail(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
             
                onChange={(e) => dispatch(changePassword(e.target.value))}
                required
              />
            </div>
            <button  className="btn btn-primary btn-block" onClick={handleLogin}>
              Login
            </button>
    
        </div>
      </div>
    </div>
  )
}

export default LoginAd