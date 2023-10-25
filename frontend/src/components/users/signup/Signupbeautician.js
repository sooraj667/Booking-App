import React, { useState } from "react";
import Signupform from "./Signupform";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../axios/axiosconfig";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Avatar, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setBeautotp } from "../../../feautures/otpslice";
import { submitForm } from "../../../feautures/beautslice";
import MuiAlert from "@mui/material/Alert";
import toast, { Toaster } from "react-hot-toast";
import signuppic from "../../../images/Barber-rafiki (1).png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signupbeautician = () => {
  const formdatas = useSelector((state) => state.signup);
  const [alreadyTaken, setAlreadyTaken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(submitForm());
    if (formdatas.value.error.submiterror) {
      toast.error("ERROR");
    }

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
      return;
    }
    axiosInstance
      .post("beaut/signup/", datas)
      .then((response) => {
        if (response.data.message === "Email-Failed") {
          setAlreadyTaken("Email already taken!");
          return;
        }

        if (response.data.message === "Phone-Failed") {
          setAlreadyTaken("Phone number already taken!");
          return;
        }

        console.log("SUCCESSFULL");
        console.log(response.data);
        dispatch(setBeautotp());
        toast.success("Otp Sent to your mail! Check");
        setTimeout(() => {
          navigate("../otp/");
        }, 3000);

        // navigate("../otp/");
      })
      .catch((error) => {
        alert("ERROR");
      });
  };

  return (
    <div className="mainrow">
      <Toaster />
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
        SIGNUP BEAUTICIAN
      </div>
      <div className="flex justify-around align-center">
        <div className="first">
          <Avatar src={signuppic} sx={{ width: 410, height: 410 }}></Avatar>
        </div>
        <div className="first">
          <Signupform />
          {formdatas.value.errorcheck == false && (
            <Button
              
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,ml:3}}
              onClick={handleSubmit}
             
            >
              Sign Up
            </Button>
          )}
          <div className="mb-5 ml-5">
            {formdatas.value.error.submiterror && (
              <Alert severity="error" sx={{}}>
                {formdatas.value.error.submiterror}
              </Alert>
            )}

            {alreadyTaken && (
              <Alert severity="error" sx={{}}>
                {alreadyTaken}
              </Alert>
            )}

            {/* <div className="text-danger ml-5 pb-5 ">{formdatas.value.error.submiterror}</div>
                  <div className="text-danger ml-5 pb-5">{alreadyTaken}</div> */}
          </div>
        </div>
      </div>
    </div>
    // <div className="row mainrow">
    //   <Toaster />

    //   <div className="flex justify-center">
    //     <div className="col-6 flex justify-center align-center">
    //     <Avatar src={signuppic} sx={{width:410,height:410}}></Avatar>

    //     </div>
    //     <div className="col-6 justify-center">
    //     <Paper
    //       elevation={24}
    //       sx={{
    //           // width: 600,
    //           // height: 510,
    //         paddingInline: 5,
    //         backgroundColor: "whitesmoke",
    //         // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
    //         objectFit: "cover",
    //         backgroundRepeat: "no-repeat",
    //         // marginLeft:"25vw",
    //         // marginRight:"25vw",
    //         marginTop: "20px",
    //         marginBottom: 10,
    //         opacity: [0.9, 0.8, 0.8],

    //         "&:hover": {
    //           backgroundColor: "whitesmoke",
    //           opacity: [0.9, 0.8, 0.7],
    //         },
    //       }}
    //       className=""
    //     >
    //       <div className=""></div>
    //       <div className="row">
    //         <div class="container mt-5">
    //           <div class="row justify-content-center">

    //               <div class="">
    //                 <div>

    //                   <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
    //                     SIGNUP FOR
    //                   </div>
    //                   <div className="sub-heading-div flex justify-center align-center py-3 text-medium fw-2 sgfont  themecolor underline">
    //                     BEAUTICIAN{" "}

    //                   </div>

    //                 </div>
    //                 <Signupform />
    //                 {formdatas.value.errorcheck == false && (
    //                   <Button
    //                     variant="contained"
    //                     onClick={handleSubmit}
    //                     sx={{
    //                       marginLeft: "100px",
    //                       marginBottom: 8,
    //                     }}
    //                   >
    //                     Sign Up
    //                   </Button>
    //                 )}
    //               </div>

    // {formdatas.value.error.submiterror && (
    //   <Alert severity="error" sx={{}}>
    //     {formdatas.value.error.submiterror}
    //   </Alert>
    // )}

    // {alreadyTaken && (
    //   <Alert severity="error" sx={{}}>
    //     {alreadyTaken}
    //   </Alert>
    // )}

    // {/* <div className="text-danger ml-5 pb-5 ">{formdatas.value.error.submiterror}</div>
    // <div className="text-danger ml-5 pb-5">{alreadyTaken}</div> */}

    //           </div>
    //         </div>
    //       </div>
    //     </Paper>

    //     </div>

    //   </div>
    //   {/* <div className="col-3"></div> */}
    //   {/* <div className="col-6">

    //   </div>
    //   <div className="col-3 "></div> */}
    // </div>
  );
};

export default Signupbeautician;
