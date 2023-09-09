import React from "react";
import "./Landingbody.css";
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
const Landingbody = () => {
 const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '17px 12px',
    border: '1px solid',
    lineHeight: 0.8,
    backgroundColor: '#191970',
    border:"none",
    marginLeft:"150px",
    marginTop:"30px",
    '&:hover': {
      backgroundColor: '#4169E1',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });
  return (
    <div className="landing">
      <div className="row">
        <div className="col-md-6">
          <div className="content">
            Find the best beauticians in Town!
            <br />
            Book Appointments Now..
          </div>
          <BootstrapButton variant="contained" >
            Get Started
          </BootstrapButton>
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
};

export default Landingbody;
