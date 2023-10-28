import React, { useState } from "react";
import Signupform from "./Signupform";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios/axiosconfig";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { setCustotp } from "../../../feautures/otpslice";
import { submitForm } from "../../../feautures/beautslice";
import MuiAlert from "@mui/material/Alert";
import toast, { Toaster } from "react-hot-toast";
import signuppic from "../../../images/Curly hair-bro.png";
import { Avatar, Grid } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signupcustomer = () => {
  const formdatas = useSelector((state) => state.signup);
  const navigate = useNavigate();
  const [alreadyTaken, setAlreadyTaken] = useState(null);
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
        if (response.data.message === "Email-Failed") {
          setAlreadyTaken("Email already taken!");
          return;
        }

        if (response.data.message === "Phone-Failed") {
          setAlreadyTaken("Phone number already taken!");
          return;
        }
        console.log("SUCCESSFULL");
        dispatch(setCustotp());
        toast.success("Otp Sent to your mail! Check");
        setTimeout(() => {
          navigate("../otp/");
        }, 3000);
      })
      .catch((error) => {
        alert("ERROR");
      });
  };

  return (
    <div className="">
      <Toaster />
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
      CUSTOMER SIGNUP  
      </div>
      <div className="flex justify-around align-center">
        <div className="first">
          <Avatar src={signuppic} sx={{ width: 410, height: 410 }}></Avatar>
        </div>
        <div className="first">
          <Signupform />
          {formdatas.value.errorcheck == false ? (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 3 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 3 }}
              onClick={() => toast.error("Please resolve the errors!")}
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

    // <div className="row">
    //   <Toaster />
    //   <div className="col-3"></div>
    //   <div className="col-6">
    //     <Paper
    //       elevation={24}
    //       sx={{
    //         width: 600,
    //         height: 610,
    //         backgroundColor: "whitesmoke",
    //         // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
    //         objectFit: "cover",
    //         backgroundRepeat: "no-repeat",

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
    //                   <h3 class="text-center">Customer Sign Up</h3>
    //                 </div>
    //                 <Signupform />
    //                 {formdatas.value.errorcheck == false && (
    //                   <Button
    //                     variant="contained"
    //                     onClick={handleSubmit}
    //                     sx={{
    //                       marginLeft: "100px",
    //                     }}
    //                   >
    //                     Sign Up
    //                   </Button>
    //                 )}
    //                 {/* {
    //               signupError&& <div className="text-danger ml-5 mt-3">Please fill all the fields!</div>
    //             } */}

    //                 {formdatas.value.error.submiterror && (
    //                   <Alert severity="error" sx={{}}>
    //                     {formdatas.value.error.submiterror}
    //                   </Alert>
    //                 )}

    //                 {alreadyTaken && (
    //                   <Alert severity="error" sx={{}}>
    //                     {alreadyTaken}
    //                   </Alert>
    //                 )}

    //                 {/* <div className="text-danger ml-5 mt-3">
    //                   {formdatas.value.error.submiterror}
    //                 </div> */}
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

export default Signupcustomer;
