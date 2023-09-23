import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch,useSelector } from "react-redux";
import {changeOtp} from "../../../feautures/otpslice"
const Otpform = () => {
  const [otp, setOtp] = useState("");
  const dispatch=useDispatch()
  
  return (
    <div>
      <div class="card-body">
        <div class="form-group">
          <div className="row">
            <label for="username" className="mr-3">
              Enter Otp:
            </label>
            <TextField
              id="standard-basic"
              label=""
              variant="standard"
              onChange={(e) => dispatch(changeOtp(e.target.value))}
            />
          </div>
      
        </div>

        
{/* 
        <p class="mt-3 text-center">
          Already have an account? <a href="login.html">Login</a>
        </p> */}
      </div>
    </div>
  );
};

export default Otpform;
