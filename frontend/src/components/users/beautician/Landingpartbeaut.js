import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Input, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import axiosInstance from "../../../axios/axiosconfig";
import Paper from "@mui/material/Paper";

import Topstack from "./Topstack";

const Landingpartbeaut = () => {
 
  const statedatas = useSelector((state) => state.login);
  const [todaysSchedule,setTodaysSchedule]=useState([])
  const dispatch = useDispatch();

  useEffect(
    ()=>{
      const beautid=localStorage.getItem("singledetails-B").id
      const datas={
        beautid:beautid
      }
      axiosInstance.get("beaut/todays-schedule/",beautid).then((response)=>{
        setTodaysSchedule(response.data.schedule)

      }).catch((error)=>{
        alert(error)

      })
    },[]
  )



  

  return (
    <div>
      <Topstack />

      
      <div>
        <Paper
          elevation={24}
          sx={{
            width: 500,
            height: 410,
            backgroundColor: "#F5FFFA",
            // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            marginLeft: "20%",
            marginTop: "30px",
            marginBottom: "30%",
            opacity: [0.9, 0.8, 0.8],

            "&:hover": {
              backgroundColor: "whitesmoke",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{ marginLeft: "30%", color: "#080000", paddingTop: "15px" }}
          >
            Today's Schedule
          </Typography>
        </Paper>
      </div>
    </div>
  );
};

export default Landingpartbeaut;
