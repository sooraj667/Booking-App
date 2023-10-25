import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import thinking from "../../../images/Thinking face-bro.png";
import Avatar from "@mui/material/Avatar";

const Signup = () => {
  return (
    <div className="row mainrow">
      <div className="flex"></div>
      <div className="col-3"></div>
      <div className="col-6 ">
        <Paper
          elevation={24}
          sx={{
            // width: 600,
            // height: 510,
            // backgroundColor: "whitesmoke",
            // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            // marginLeft:"25vw",
            // marginRight:"25vw",
            marginTop: "20px",
            marginBottom: 10,
            paddingBottom: 10,
            opacity: [0.9, 0.8, 0.8],

            "&:hover": {
              backgroundColor: "whitesmoke",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          className="paper"
        >
          <div className="content">Join as a Beautician or Customer</div>
          <div className="row btnrow mt-5">
            <div className="col-md-4 ml-5 ">
              <Link to="../signupbeautician/">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    // marginLeft: "120px",
                    // marginTop: "50px",
                    "&:hover": {
                      backgroundColor: "blue",
                      color: "white",
                      opacity: [0.2, 0.2, 0.7],
                    },
                  }}
                >
                  Beautician
                </Button>
              </Link>
            </div>
            <div className="col-md-4 ml-5">
              <Link to="../signupcustomer/">
                <Button
                  variant="outlined"
                  sx={{
                    // marginLeft: "20px",
                    // marginTop: "50px",
                    "&:hover": {
                      backgroundColor: "blue",
                      color: "white",
                      opacity: [0.2, 0.2, 0.7],
                    },
                  }}
                  size="large"
                >
                  Customer
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Avatar src={thinking} sx={{ width: 250, height: 250 }}></Avatar>
            <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
              Your Beauty, Your Way <br /> Signup Now for <br />
              Tailored Experiences!
            </div>
          </div>
          <div className="sub-heading-div flex justify-center align-center py-3  fw-2 sgfont  themecolor underline  ">
            Already an user?{" "}
            <Link to="../login">
              <span className="cur ml-2">Login</span>
            </Link>
          </div>
        </Paper>
      </div>
      <div className="col-3 "></div>
    </div>
  );
};

export default Signup;
