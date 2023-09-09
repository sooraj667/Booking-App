import React from "react";
import {changeEmail,changePassword} from "../../../feautures/loginslice"
import { useDispatch } from "react-redux";
const Loginform = () => {
    const dispatch=useDispatch()
  return (
    <div>
      <div class="card-body">
        <div class="form-group">
          <label for="username">Email:</label>
          <input
            type="text"
            id="username"
            name="username"
            class="form-control"
            required
            onChange={(e) => dispatch(changeEmail(e.target.value))}
          />
        </div>

    

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            required
            onChange={(e) => dispatch(changePassword(e.target.value))}
          />
        </div>

       
      </div>
    </div>
  );
};

export default Loginform;
