import React, { useState, useEffect } from "react";
import Loginform from "./Loginform";
import axiosInstance from "../../../axios/axiosconfig";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBeautDetails, setAccessToken } from "../../../feautures/loginslice";
import Cookies from "js-cookie";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { setBeautician } from "../../../feautures/forgotpassword/forgotpasswordslice";

import { Avatar, Grid } from "@mui/material";

import { setBeautotp } from "../../../feautures/otpslice";
import { submitForm } from "../../../feautures/beautslice";

import toast, { Toaster } from "react-hot-toast";
import signuppic from "../../../images/hairdresser team-amico.png";
import MuiAlert from "@mui/material/Alert";
import ForgotpwModal from "../forgotPassword/ForgotpwModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Loginbeautician = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [blockederror, setBlockedError] = useState(false);
  const formdatas = useSelector((state) => state.login);
  const navigate = useNavigate();
  const handleSubmit = () => {
    const datas = {
      email: formdatas.value.email,
      password: formdatas.value.password,
    };

    axiosInstance
      .post("beaut/login/", datas)
      .then((response) => {
        if (response.data.message == "Matched") {
          Cookies.set("accesstoken-B", response.data.accesstoken, {
            expires: 7,
          });
          localStorage.setItem(
            "singledetails-B",
            JSON.stringify(response.data.beautdata)
          );
          localStorage.setItem(
            "expertin-B",
            JSON.stringify(response.data.expertin)
          );
          localStorage.setItem(
            "services-B",
            JSON.stringify(response.data.services)
          );
          localStorage.setItem(
            "allservices-B",
            JSON.stringify(response.data.allservices)
          );
          localStorage.setItem(
            "studios-B",
            JSON.stringify(response.data.allservices)
          );
          console.log(response.data, "##################33");
          navigate("../beautician-dashboard");
        } else if (response.data.message == "Blocked") {
          setBlockedError(true);
          setError(false);
        } else {
          setError(true);
          setBlockedError(false);
          // alert("Credentials wrong")
        }
      })
      .catch((error) => {
        alert("error");
      });
  };

  useEffect(() => {
    dispatch(setBeautician());
    localStorage.setItem("change-pw-status", "beautician");
  });
  return (
    <div className="mainrow mb-5">
      <Toaster />
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
      BEAUTICIAN LOGIN 
      </div>
      <div className="flex justify-around align-center">
        <div className="first">
          <Avatar src={signuppic} sx={{ width: 410, height: 410 }}></Avatar>
        </div>
        <div className="second pb-5 ">
          <Loginform />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: 3 }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div className="ml-4">
            <ForgotpwModal />
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
            {blockederror && (
              <Alert
                severity="error"
                sx={{
                  marginTop: "20px",
                }}
              >
                Sorry You are blocked!
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>

    // <div className="row">
    //   <div className="col-3"></div>
    //   <div className="col-6">
    //     <Paper
    //       elevation={24}
    //       sx={{
    //         // width: 500,
    //         // height: 410,
    //         padding:3,
    //         backgroundColor: "whitesmoke",
    //         // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
    //         objectFit: "cover",
    //         backgroundRepeat: "no-repeat",
    //         marginTop: "30px",
    //         opacity: [0.9, 0.8, 0.8],

    //         "&:hover": {
    //           backgroundColor: "whitesmoke",
    //           opacity: [0.9, 0.8, 0.7],
    //         },
    //       }}
    //     >
    //       <div className=""></div>
    //       <div className="row">
    //         <div class="container mt-5">
    //           <div class="row justify-content-center">
    //             <div class="col-md-6">
    //               <div class="">
    //                 <div>
    //                   <h3 class="text-center">Beautician Login</h3>
    //                 </div>
    //                 <Loginform />
    //                 <Button
    //                   variant="contained"
    //                   onClick={handleSubmit}
    //                   sx={{
    //                     marginLeft: "80px",
    //                   }}
    //                 >
    //                   Login
    //                 </Button>
    //                 <ForgotpwModal />
    //                 {error && (
    //                   <Alert
    //                     severity="error"
    //                     sx={{
    //                       marginTop: "20px",
    //                     }}
    //                   >
    //                     Wrong Credentials!
    //                   </Alert>
    //                 )}
    //                 {blockederror && (
    //                   <Alert
    //                     severity="error"
    //                     sx={{
    //                       marginTop: "20px",
    //                     }}
    //                   >
    //                     Sorry You are blocked!
    //                   </Alert>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </Paper>
    //   </div>
    //   <div className="col-3"></div>
    // </div>
  );
};

export default Loginbeautician;
