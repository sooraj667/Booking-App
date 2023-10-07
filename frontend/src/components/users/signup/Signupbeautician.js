import React,{useState} from "react";
import Signupform from "./Signupform";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../axios/axiosconfig";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setBeautotp } from "../../../feautures/otpslice";
import {submitForm} from "../../../feautures/beautslice"
import MuiAlert from "@mui/material/Alert";
import toast, { Toaster } from 'react-hot-toast';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Signupbeautician = () => {
  const formdatas = useSelector((state) => state.signup);
  const [alreadyTaken,setAlreadyTaken]=useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(submitForm())
    const datas = {
      pname: formdatas.value.pname,
      email: formdatas.value.email,
      phone: formdatas.value.phone,
      password: formdatas.value.password,
    };
    if (formdatas.value.pname==="" || formdatas.value.email==="" || formdatas.value.phone==="" || formdatas.value.password===""){
      
      return
    }
    axiosInstance
      .post("beaut/signup/", datas)
      .then((response) => {
        if(response.data.message==="Email-Failed"){
          setAlreadyTaken("Email already taken!")
          return

        }

        if(response.data.message==="Phone-Failed"){
          setAlreadyTaken("Phone number already taken!")
          return

        }


        console.log("SUCCESSFULL");
        console.log(response.data);
        dispatch(setBeautotp());
        toast.success('Otp Sent to your mail! Check')
        setTimeout(()=>{
                    
        navigate("../otp/")

          },3000)

        // navigate("../otp/");
      })
      .catch((error) => {
        alert("ERROR");
      });
  };

  return (
    <div className="row mainrow">
      <Toaster/>
      <div className="col-3">

      </div>
      <div className="col-6">
      <Paper
          elevation={24}
          sx={{
            // width: 600,
            // height: 510,
            padding:3,
            backgroundColor: "whitesmoke",
            // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            // marginLeft:"25vw",
            // marginRight:"25vw",
            marginTop: "20px",
            marginBottom:10,
            opacity: [0.9, 0.8, 0.8],

            "&:hover": {
              backgroundColor: "whitesmoke",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          className="paper"
        >
          <div className=""></div>
          <div className="row">
            <div class="container mt-5">
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="">
                    <div>
                      <h3 class="text-center">Beautician Sign Up</h3>
                    </div>
                    <Signupform />
                    {formdatas.value.errorcheck == false && (
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                          marginLeft: "100px",
                          marginBottom:8,
                        }}
                      >
                        Sign Up
                      </Button>
                    )}

                  
                  </div>


                  {formdatas.value.error.submiterror&&
                  <Alert
                  severity="error"
                  sx={{
                    
                   
                  }}
                >
                  {formdatas.value.error.submiterror}
                </Alert>


                  }


                  {alreadyTaken &&
                  <Alert
                  severity="error"
                  sx={{
                    
                  }}
                >
                  {alreadyTaken}
                </Alert>

                  }

                  

                      
                  {/* <div className="text-danger ml-5 pb-5 ">{formdatas.value.error.submiterror}</div>
                  <div className="text-danger ml-5 pb-5">{alreadyTaken}</div> */}
                </div>
              </div>
            </div>
          </div>
        </Paper>
        

      </div>
      <div className="col-3 ">

      </div>
    
    </div>









  //   <div className="row">
  //     <div className="col-md-3"></div>

  //     {/* <Grid container justifyContent="center">
  //   <Grid item xs={12} sm={8} md={6}> */}
  //     <div className="col-md-6  ">
  //       <Paper
  //         elevation={24}
  //         sx={{
  //           // width: 600,
  //           // height: 510,
  //           backgroundColor: "whitesmoke",
  //           // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
  //           objectFit: "cover",
  //           backgroundRepeat: "no-repeat",
  //           // marginLeft:"25vw",
  //           // marginRight:"25vw",
  //           marginTop: "20px",
  //           marginBottom:10,
  //           opacity: [0.9, 0.8, 0.8],

  //           "&:hover": {
  //             backgroundColor: "whitesmoke",
  //             opacity: [0.9, 0.8, 0.7],
  //           },
  //         }}
  //         className="paper"
  //       >
  //         <div className=""></div>
  //         <div className="row">
  //           <div class="container mt-5">
  //             <div class="row justify-content-center">
  //               <div class="col-md-6">
  //                 <div class="">
  //                   <div>
  //                     <h3 class="text-center">Beautician Sign Up</h3>
  //                   </div>
  //                   <Signupform />
  //                   {formdatas.value.errorcheck == false && (
  //                     <Button
  //                       variant="contained"
  //                       onClick={handleSubmit}
  //                       sx={{
  //                         marginLeft: "100px",
  //                         marginBottom:8,
  //                       }}
  //                     >
  //                       Sign Up
  //                     </Button>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </Paper>
  //     </div>

  //     <div className="col-md-3">
        
  //       </div>

  //     {/* </Grid>
  // </Grid> */}
  //   </div>
  );
};

export default Signupbeautician;
