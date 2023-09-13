import React from 'react'
import Loginform from "./Loginform";
import axiosInstance from '../../../axios/axiosconfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button"



const Logincustomer = () => {
  const dispatch=useDispatch()
  const formdatas=useSelector((state)=>state.login)
  const navigate=useNavigate()
  const handleSubmit=()=>{
    const datas={
        email:formdatas.value.email,
        password:formdatas.value.password
      }

      axiosInstance.post("cust/login/",datas).then((response)=>{
        console.log(response.data);
        if (response.data.message=="Matched"){
       
            Cookies.set("accesstoken-C",response.data.accesstoken,{ expires: 7 })
            localStorage.setItem("singledetails-C",JSON.stringify(response.data.custdata))
            localStorage.setItem("allbeauticians-C",JSON.stringify(response.data.allbeautdata))
            navigate("../customer-dashboard")

        }
        else{
            alert("Credentials wrong")
        }
        
      }).catch((error)=>{
        alert("error")
      })

}
  return (


    <Paper elevation={24}   sx={{
      width: 500,
      height: 410,
      backgroundColor: "whitesmoke",
      // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
      objectFit:"cover",
      backgroundRepeat:"no-repeat",
      marginLeft:"30%",
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
                  <h3 class="text-center">Customer Login</h3>
                </div>
                <Loginform />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    marginLeft:"80px"
                  }}
                >
                  Login
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>


    // <div className="signupbeaut">
    //   <div className=""></div>
    //   <div className="row">
    //     <div class="container mt-5">
    //       <div class="row justify-content-center">
    //         <div class="col-md-6">
    //           <div class="">
    //             <div class="card-header">
    //               <h3 class="text-center">Customer Login</h3>
    //             </div>
    //             <Loginform />
    //             <button
    //               class="btn btn-primary btn-block"
    //               onClick={handleSubmit}
    //             >
    //               Login
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    
  )
}

export default Logincustomer