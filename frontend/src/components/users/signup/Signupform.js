import React from "react";

import {
  changePName,
  changeEmail,
  changePhone,
  changePassword,
  changeCpassword,
  
} from "../../../feautures/beautslice";
import { useDispatch,useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

const Signupform = () => {
  const dispatch = useDispatch();
  const datas=useSelector((state)=>state.signup)

  return (
    <div>
      <div class="card-body">
        <div class="form-group">
          <div className="row">
            <label for="username" className="mr-3">
              Name:
            </label>
            <TextField
              id="standard-basic"
              label=""
              variant="standard"
              // type="text"
              // id="username"
              // name="username"
              // class="form-control"
              // required
              onChange={(e) => dispatch(changePName(e.target.value))}
            />
          </div>
          <span className="text-danger">{datas.value.error.pname}</span>
        </div>

        <div class="form-group">
          <div className="row">
            <label for="email" className="mr-3">
              Email:
            </label>
            <TextField
              
              variant="standard"
              onChange={(e) => dispatch(changeEmail(e.target.value))}
            />
          </div>
          <span className="text-danger">{datas.value.error.email}</span>
        </div>

        <div class="form-group">
          <div className="row">
            <label for="password" className="mr-3">
              Phone:
            </label>
            <TextField
              type="numtextber"
            
              variant="standard"  
            
              required
              onChange={(e) => dispatch(changePhone(e.target.value))}
            />
          </div>
          <span className="text-danger">{datas.value.error.phone}</span>
        </div>

        <div class="form-group">
          <div className="row">
            <label for="password" className="mr-3">Password:</label>
            <TextField
              type="password"
              id="password"
              name="password"
              variant="standard"  
           
              required
              onChange={(e) => dispatch(changePassword(e.target.value))}
            />
          </div>
        </div>

        <div class="form-group">
          <div className="row">
            <label for="password" className="">Retype Password:</label>
            <TextField
              type="password"
              id="password"
              name="password"
              variant="standard"  
           
              required
              onChange={(e) => dispatch(changeCpassword(e.target.value))}
            />
          </div>
          <span className="text-danger">{datas.value.error.cpassword}</span>
        </div>

        <p class="mt-3 text-center">
          Already have an account? <a href="login.html">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signupform;
