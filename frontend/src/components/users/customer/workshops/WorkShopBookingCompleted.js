import React from 'react'
import toast, { Toaster } from "react-hot-toast";
import Contents from "../Contents";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from "@mui/material/colors";
import axiosInstance from "../../../../axios/axiosconfig";
import { useSelector } from "react-redux";
import  Button  from "@mui/material/Button";
import { Link } from "react-router-dom";

const WorkShopBookingCompleted = () => {
  return (
    <div className="beautouter">
      <div className="row outer">
        <div className="col-md-12">
            <div className="flex justify-center">
                <div className="booking-completed-box">
                    <div className="title">
                        BOOKING COMPLETED!  
                        
                        
                        

                    </div>
                    
                    <div className="">
                        <CheckCircleOutlineIcon sx={{width:100,height:100,color:"#24A984"}}/>
                    </div>
                    <div className="description">
                       
                        <div>
                            
                        Your online workshop booking is successfull!

                        </div>

                       
                       

                     
                        
                    

                    </div>
                    {/* <div className="more-description">
                        Please be available at the studio on {appointmentDetails.date} - {appointmentDetails.time}

                    </div> */}
                    <div className="thankyou">
                        THANK YOU!
                    </div>
                    <div className="backtohome">

                        <Link to="../customer-dashboard">
                        <Button
                        sx={{
                            marginTop: "10px",
                            backgroundColor: "inherit",
                            color: "black",
                            "&:hover": {
                              backgroundColor: "#212529",
                              color: "#D0D4D9", // Specify the desired background color on hover
                            },
                          }}>
                            Back To Home
                        </Button>

                        
                        </Link>

                        


                    </div>
                    
                </div>
            </div>
          
        </div>
      


      </div>
    </div>
  )
}

export default WorkShopBookingCompleted