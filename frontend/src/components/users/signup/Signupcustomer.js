import React, { useState } from "react";
import Signupform from "./Signupform";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios/axiosconfig";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { submitForm } from "../../../feautures/beautslice";
const Signupcustomer = () => {
  const formdatas = useSelector((state) => state.signup);
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(submitForm());
    console.log(formdatas.value.error.submiterror, "GGG");
    // if (signupdatas.value.error.submiterror===true){
    //   console.log("RETURN CHEYYEDA KOPPE");
    //   return
    // }
    const datas = {
      pname: formdatas.value.pname,
      email: formdatas.value.email,
      phone: formdatas.value.phone,
      password: formdatas.value.password,
    };
    if (
      formdatas.value.pname === "" ||
      formdatas.value.email === "" ||
      formdatas.value.phone === "" ||
      formdatas.value.password === ""
    ) {
      setSignupError(true);
      return;
    }

    axiosInstance
      .post("cust/signup/", datas)
      .then((response) => {
        console.log("SUCCESSFULL");
        console.log(response.data);
        navigate("../logincustomer/");
      })
      .catch((error) => {
        alert("ERROR");
      });
  };

  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6">
        <Paper
          elevation={24}
          sx={{
            width: 600,
            height: 610,
            backgroundColor: "whitesmoke",
            // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
          
            opacity: [0.9, 0.8, 0.8],

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
                      <h3 class="text-center">Customer Sign Up</h3>
                    </div>
                    <Signupform />
                    {formdatas.value.errorcheck == false && (
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                          marginLeft: "100px",
                        }}
                      >
                        Sign Up
                      </Button>
                    )}
                    {/* {
                  signupError&& <div className="text-danger ml-5 mt-3">Please fill all the fields!</div>
                } */}

                    <div className="text-danger ml-5 mt-3">
                      {formdatas.value.error.submiterror}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default Signupcustomer;
