import React from "react";
import { Paper } from "@mui/material";
import Header from "../users/header/Header";
import Signupform from "../users/signup/Signupform";
const Dummy = () => {
  return (
    <div>
      <Header />

      <div className="container-fluid maincont  ">
        <div className="row">
          <div className="col-md-3 ">
            df
          </div>

          <div className="col-md-6  cols bg-secondary">
            
            <Paper elevation={3} className="paperesh">
              <Signupform />
            </Paper>
          </div>

          <div className="col-md-3 ">
            fg
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dummy;
