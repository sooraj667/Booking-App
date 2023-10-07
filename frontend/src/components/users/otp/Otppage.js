import React, { useState } from "react";
import axiosInstance from "../../../axios/axiosconfig";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBeautDetails, setAccessToken } from "../../../feautures/loginslice";
import Cookies from "js-cookie";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";
import Otpform from "./Otpform";
import toast, { Toaster } from "react-hot-toast";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Otppage = () => {
  const otpdatas = useSelector((state) => state.otp);
  const signupdatas = useSelector((state) => state.signup);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    const datas = {
      otp: otpdatas.value.otp,
      email: signupdatas.value.email,
    };
    console.log(datas, "OTP");
    if (otpdatas.value.beautotpstatus == true) {
      axiosInstance
        .post("beaut/confirmotp/", datas)
        .then((response) => {
          console.log(response.data);
          if (response.data.message == "Success") {
            toast.success("Otp Matched! Redirecting to Login Page");
            setTimeout(() => {
              navigate("../loginbeautician/");
            }, 3000);
          } else {
            setError(true);
          }
        })
        .catch((error) => alert(error));
    }

    if (otpdatas.value.custotpstatus == true) {
      axiosInstance
        .post("cust/confirmotp/", datas)
        .then((response) => {
          console.log(response.data);
          if (response.data.message == "Success") {
            toast.success("Otp Matched! Redirecting to Login Page");
            setTimeout(() => {
              navigate("../logincustomer/");
            }, 3000);
          } else {
            setError(true);
          }
        })
        .catch((error) => alert(error));
    }
  };
  return (
    <div>
      <Toaster />
      <Paper
        elevation={24}
        sx={{
          width: 500,
          height: 410,
          backgroundColor: "whitesmoke",
          backgroundImage:
            'url("https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")',
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          marginLeft: "30%",
          marginTop: "40px",
          opacity: [0.9, 0.8, 0.8],
          paddingTop: "100px",

          "&:hover": {
            backgroundColor: "whitesmoke",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div className=""></div>
        <div className="row">
          <div class="container mt-5">
            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="">
                  <div>
                    <h3 class="text-center">OTP</h3>
                  </div>
                  <Otpform />
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                      marginLeft: "80px",
                    }}
                  >
                    Submit
                  </Button>

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
        </div>
      </Paper>
    </div>
  );
};

export default Otppage;
