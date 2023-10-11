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
import "./Landingpartbeaut.css"

const Landingpartbeaut = () => {
 
  const statedatas = useSelector((state) => state.login);
  const [todaysSchedule,setTodaysSchedule]=useState([])
  const [noSchedule,setNoSchedule]=useState(false)

  const [todayDate,setTodaysDate]=useState("")
  const [day,setDay]=useState("")
  const dispatch = useDispatch();

  useEffect(
    ()=>{
      const beautid=JSON.parse(localStorage.getItem("singledetails-B"))
      const datas={
        beautid:beautid.id
      }
      console.log(datas,"NOKKADA");
      axiosInstance.post("beaut/todays-schedule/",datas).then((response)=>{
        if (response.data.message==="failed"){
          setNoSchedule(true)
        

        }
        else{
          setTodaysSchedule(response.data.schedule)

        }
        setTodaysDate(response.data.date)
        setDay(response.data.day)
        

      }).catch((error)=>{
        console.log(error);

      })
    },[]
  )



  

  return (
    <div>
      <div className="hero">
        TODAYS SCHEDULE
      </div>
      <hr />
      <div className="schedule-outer">
        <div className="schedule-box">
          <div className="top">
            <div className="col-md-8 headingg">
              SCHEDULES

            </div>
            <div className="col-md-4 datee">
            {day} {todayDate}

            </div>
            
          </div>
          <hr />
          <div className="sch-content">
          {
            noSchedule ? 
            <div className="no-schedule">
              No Bookings!
            </div> : ""
          }


          </div>
          

        </div>

      </div>
     
    </div>
  );
};

export default Landingpartbeaut;
