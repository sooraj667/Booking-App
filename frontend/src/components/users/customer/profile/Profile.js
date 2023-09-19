import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import  Typography  from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
// import "./Profile.css"
import Editdetailsmodal from "./Editdetailsmodal";

const Profile = () => {
  const statedatas = useSelector((state) => state.login);
  return (
    <Paper
        elevation={24}
        sx={{
          width: 850,

          height: 850,
          backgroundColor: "#F5FFFA",
          // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          marginTop: "30px",
          marginBottom: "30%",
          opacity: [0.9, 0.8, 0.8],

          "&:hover": {
            backgroundColor: "whitesmoke",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div style={{"marginLeft":"320px","paddingTop":"120px"}}>
            <div className="row ">
                <Avatar src={statedatas.value.custdetails.image}  sx={{ width: 125, height: 125 }}/>

            </div>
            <div className="row  mt-3 ">
                <Typography variant="h6" component="h1"> Name : </Typography>
                <Typography variant="h6" component="h1"> {statedatas.value.custdetails.name} </Typography>

            </div>
            <div className="row  mt-3">
                <Typography variant="h6" component="h1"> Email : </Typography>
                <Typography variant="h6" component="h1"> {statedatas.value.custdetails.email} </Typography>

            </div>

            <div className="row  mt-3">
                <Typography variant="h6" component="h1"> Phone : </Typography>
                <Typography variant="h6" component="h1"> {statedatas.value.custdetails.phone} </Typography>

            </div>
            <Editdetailsmodal/>
            


            

       

        </div>
        
   
        
      </Paper>
    
  )
}

export default Profile 