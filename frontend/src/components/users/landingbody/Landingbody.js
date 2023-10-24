import React from "react";
import "./Landingbody.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import HomePageAnimation from "../../animation/HomePageAnimation";
import TypeWriter from "../../animation/TypeWriter";
const Landingbody = () => {
  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "17px 12px",
    border: "1px solid",
    lineHeight: 0.8,
    backgroundColor: "#191970",
    border: "none",
   
    marginTop: "30px",
    "&:hover": {
      backgroundColor: "#4169E1",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });
  return (
    <div className="">
     
       
          <div className="content flex justify-center">
            Find the best beauticians in Town!
            <br />
            Book Appointments Now..
            <br />
           
          </div>
        
          <div className="flex justify-center mb-3">
          <Link className="getstarted" to="/signup">
            <BootstrapButton variant="contained">Get Started</BootstrapButton>
          </Link>
          </div>

          <div className="flex justify-center">
            
            <TypeWriter/>
          </div>
         
         
  
        {/* <div className="col-md-6">
          <img
            className="imagecls"
            src={
              "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            }
            alt=""
          />
        </div> */}

      <div className="flex justify-center">
        <HomePageAnimation />
      </div>
    </div>
  );
};

export default Landingbody;
