import React,{useState} from 'react'
// import {changeEmail,changePassword,setAccessTokenAd,setDetails} from "../../../feautures/adminloginslice"
import { useSelector,useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import axiosInstance from '../../../axios/axiosconfig'
import { useNavigate } from 'react-router-dom'
import Loginform from '../../users/login/Loginform'

import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button"
import { Avatar, Grid } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import toast, { Toaster } from "react-hot-toast";
import adminpic from "../../../images/Work time-amico.png";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginAd = () => {
  const dispatch=useDispatch()
  const [error,setError]=useState(false)
  const navigate=useNavigate()
  //const formdatas=useSelector((state)=>state.adminlogin)
  const formdatas=useSelector((state)=>state.login)

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
          localStorage.setItem("allcustdatas",JSON.stringify(response.data.allcustdatas))
          localStorage.setItem("allservices",JSON.stringify(response.data.allservices))
          localStorage.setItem("allappointments",JSON.stringify(response.data.allappointments))
          console.log(response.data.allappointments,"****************");
          navigate("../admindashboard")

      }
      else{
        setError(true)

          
      }
      
    }).catch((error)=>{
      alert("error")
    })
  }
  return (


    <div className="mainrow mb-5">
      <Toaster />
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
        LOGIN ADMIN
      </div>
      <div className="flex justify-around align-center">
        <div className="first">
          <Avatar src={adminpic} sx={{ width: 410, height: 410 }}></Avatar>
        </div>
        <div className="second pb-5 ">
          <Loginform />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: 3 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <div className="ml-4">
            {/* <ForgotpwModal /> */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  marginTop: "20px",
                }}
              >
                Wrong Credentials!
              </Alert>
            )}
            
          </div>
        </div>
      </div>
    </div>


















    // <div style={{backgroundImage:"url('https://images.unsplash.com/photo-1579546928686-286c9fbde1ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1878&q=80')",height:"610px",paddingTop:"50px"}}>
    // <Paper elevation={24}   sx={{
    //   width: 500,
    //   height: 410,
    //   backgroundColor: "whitesmoke",
    //   // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
    //   objectFit:"cover",
    //   backgroundRepeat:"no-repeat",
    //   marginLeft:"30%",
    //   marginTop:"30px",
    //   opacity: [0.9, 0.8, 0.8],
     
    //   '&:hover': {
    //     backgroundColor: 'whitesmoke',
    //     opacity: [0.9, 0.8, 0.7],
    //   },
    // }}>
    //   <div className=""></div>
    //   <div className="row">
    //     <div class="container mt-5">
    //       <div class="row justify-content-center">
    //         <div class="col-md-6">
    //           <div class="">
    //             <div >
    //               <h3 class="text-center">Admin Login</h3>
    //             </div>
    //             <Loginform />
    //             <Button
    //               variant="contained"
    //               onClick={handleLogin}
    //               sx={{
    //                 marginLeft:"80px"
    //               }}
    //             >
    //               Login
    //             </Button>
    //             {
    //               error && <Alert severity="error" sx={{
    //                 marginTop:'20px'
    //               }}>Wrong Credentials!</Alert>
    //             }
               
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Paper>
    // </div>







  )
}

export default LoginAd