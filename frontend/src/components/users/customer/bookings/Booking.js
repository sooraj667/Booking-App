import React, { useEffect, useState } from "react";
import { Input, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Topstackcust from "../Topstackcust";
import { useSelector, useDispatch } from "react-redux";
import { setAllappointments } from "../../../../feautures/customer/customerdataslice";
import axiosInstance from "../../../../axios/axiosconfig";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import "./Bookings.css";

const Booking = () => {
  const custdata = useSelector((state) => state.login);
  const reqdatas = useSelector((state) => state.custreqdata);
  const dispatch = useDispatch();

  useEffect(() => {
    const custdetails = JSON.parse(localStorage.getItem("singledetails-C"));
    console.log(custdetails, "################3");

    const datas = {
      custid: custdetails.id,
    };
    axiosInstance
      .post("cust/getbookings/", datas)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data.appointmentdata, "########################");
          //   const parseddata=JSON.parse(res.data.studiodata)
          //   console.log(parseddata,"PARSEDDATA");
          dispatch(setAllappointments(res.data.appointmentdata));
          //dispatch(setBeautservices(res.data.servicedata));
        }
        if (res.data.message === "notsuccess") {
          console.log("not success");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Topstackcust />

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
        <div class="heading">All Bookings</div>

        {reqdatas.value.allappointments.map((item) => {
          return (
            <>
              <Stack spacing={2} class="stackdiv">
                <div class="row">
                  <div className="col-md-8">
                    <div className="row">
                      <div className="titles">Date:</div>

                      <div class="values">{item.date}</div>
                    </div>
                    <div className="row">
                      <div className="titles">Time:</div>

                      <div class="values">{item.time}</div>
                    </div>
                    <div className="row">
                      <div className="titles">Studio Address:</div>

                      <div class="values">{item.studio.locality} ,{item.studio.place},{item.studio.district},{item.studio.state}</div>
                    </div>
                    <div className="row">
                      <div className="titles">Service:</div>

                      <div class="values">{item.service.service.name}</div>
                    </div>
                    <div className="row">
                      <div className="titles">Amount:</div>

                      <div class="values">{item.service.servicefee}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <Avatar alt="Remy Sharp" src={item.beautician.image}  sx={{width:120,height:120}}/>
                    <div className="titles">Appointment with:</div>
                    <div class="values">{item.beautician.name}</div>
                    
                  </div>
                </div>

                
              </Stack>
            </>
          );
        })}
      </Paper>
    </div>
  );
};

export default Booking;
