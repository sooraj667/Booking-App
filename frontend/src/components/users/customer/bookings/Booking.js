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
       {/* <Topstackcust/> */}
      <div className="row">
        <div className="heading1">
          Booking History
        </div>
      </div>

      <Paper
        elevation={24}
        sx={{
          width: 900,
          height: "auto",
          backgroundColor: "#F5FFFA",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "12px",
          transition: "background-color 0.3s, opacity 0.3s",
          opacity: [0.9, 0.8, 0.8],
          "&:hover": {
            backgroundColor: "whitesmoke",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div
          className="heading"
          style={{ fontSize: "1.5rem", fontWeight: "bold" ,marginLeft:"320px"}}
        >
          All Bookings
        </div>

        {reqdatas.value.allappointments.map((item, index) => (
          <Stack
            spacing={2}
            className="stackdiv"
            key={index}
            sx={{
              borderBottom: "1px solid #ddd",
              marginBottom: "10px",
              paddingBottom: "10px",
            }}
          >
            <div className="row">
              <div className="col-md-8">
                <div className="titles" style={{ fontWeight: "bold" }}>
                  Date:
                </div>
                <div className="values">{item.date}</div>

                <div className="titles" style={{ fontWeight: "bold" }}>
                  Time:
                </div>
                <div className="values">{item.time}</div>

                <div className="titles" style={{ fontWeight: "bold" }}>
                  Studio Address:
                </div>
                <div className="values">
                  {`${item.studio.locality}, ${item.studio.place}, ${item.studio.district}, ${item.studio.state}`}
                </div>

                <div className="titles" style={{ fontWeight: "bold" }}>
                  Service:
                </div>
                <div className="values">{item.service.service.name}</div>

                <div className="titles" style={{ fontWeight: "bold" }}>
                  Amount:
                </div>
                <div className="values">{item.service.servicefee}</div>
              </div>
              <div className="col-md-4">
                <Avatar
                  alt={item.beautician.name}
                  src={item.beautician.image}
                  sx={{ width: 120, height: 120, borderRadius: "50%" }}
                />
                <div className="titles" style={{ fontWeight: "bold" }}>
                  Appointment with:
                </div>
                <div className="values">{item.beautician.name}</div>
              </div>
            </div>
          </Stack>
        ))}
      </Paper>
    </div>
  );
};

export default Booking;
