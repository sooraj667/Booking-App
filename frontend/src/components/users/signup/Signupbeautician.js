import React from "react";
import Signupform from "./Signupform";
import { useSelector,useDispatch } from "react-redux";
import axiosInstance from "../../../axios/axiosconfig";
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button"

import { useNavigate } from "react-router-dom";
import {setBeautotp} from "../../../feautures/otpslice"


const Signupbeautician = () => {


  const formdatas=useSelector((state)=> state.signup)
  const navigate=useNavigate()
  const dispatch=useDispatch()
 

  const handleSubmit=()=>{
    const datas={
      pname:formdatas.value.pname,
      email:formdatas.value.email,
      phone:formdatas.value.phone,
      password:formdatas.value.password
      
    }
    axiosInstance.post("beaut/signup/",datas).then((response)=>{
      console.log("SUCCESSFULL");
      console.log(response.data);
      dispatch(setBeautotp())
      navigate("../otp/")
      
    }).catch((error)=>{
      alert("ERROR")

    })
    
  }


  return (
    <Paper elevation={24}   sx={{
      width: 600,
      height: 510,
      backgroundColor: "whitesmoke",
      // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
      objectFit:"cover",
      backgroundRepeat:"no-repeat",
      marginLeft:"25%",
      marginTop:"30px",
      opacity: [0.9, 0.8, 0.8],
     
      '&:hover': {
        backgroundColor: 'whitesmoke',
        opacity: [0.9, 0.8, 0.7],
      },
    }}>
      <div className=""></div>
      <div className="row">
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="">
                <div >
                  <h3 class="text-center">Beautician Sign Up</h3>
                </div>
                <Signupform />
                {
                  formdatas.value.errorcheck==false&& <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    marginLeft:"100px"
                  }}
                >
                  Sign Up
                </Button>
                }
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Signupbeautician;
