import React, { useState, useEffect } from "react";
import { toggleAppointments } from "../../../../feautures/beautician/beautnavigationslice";
import { useSelector, useDispatch } from "react-redux";
import { setAllappointments } from "../../../../feautures/customer/customerdataslice";
import axiosInstance from "../../../../axios/axiosconfig";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast, { Toaster } from "react-hot-toast";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import ImageListItem from "@mui/material/ImageListItem";

import AspectRatio from "@mui/joy/AspectRatio";
import Stack from "@mui/joy/Stack";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import emptypic from "../../../../images/Empty-pana.png";

const PreviousBeautBookings = () => {
  const custdata = useSelector((state) => state.login);
  const reqdatas = useSelector((state) => state.custreqdata);
  const [allAppointments, setAllAppointments] = useState(false);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [bookingToggleHandler, setBookingToggleHandler] = useState(false);

  useEffect(() => {
    const beautdetails = JSON.parse(localStorage.getItem("singledetails-B"));
    console.log(beautdetails, "################3");

    const datas = {
      beautid: beautdetails.id,
    };
    axiosInstance
      .post("beaut/get-previous-booking/", datas)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data.appointmentdata, "########################");
          //   const parseddata=JSON.parse(res.data.studiodata)
          //   console.log(parseddata,"PARSEDDATA");
          setAllAppointments(res.data.appointmentdata);
          //dispatch(setBeautservices(res.data.servicedata));
        }
        if (res.data.message === "notsuccess") {
          console.log("not success");
          setAllAppointments(false)
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const addressHandler = (id) => {
    if (address == "") {
      setAddress(id);
    } else {
      setAddress("");
    }
  };

  // const handleCancelItem = (id) => {
  //     setCancelItemID(id);
  //     handleClickOpen();
  //   };

  const previouBookingClickHandler = () => {
    dispatch(toggleAppointments());
  };
  return (
    <div className="booking-outer">
      <Toaster />
      <div
        className="booking-hero"
        onClick={() => setBookingToggleHandler((prev) => !prev)}
      >
        PREVIOUS BOOKING <ArrowDropDownIcon />
      </div>
      {bookingToggleHandler && (
        <div className="previous-booking" onClick={previouBookingClickHandler}>
          BOOKING
        </div>
      )}
      <hr /> 
      <div className="flex justify-center">
        {console.log(reqdatas.value.allappointments, "BYDUBAI")}

        <section className="aboutHome">
          <div className="container flexSB">
            {/* <div className='left row'>
            <img src={"https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80"} alt='' />
          </div> */}
            <div className="right row">
              {/* <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' /> */}
              <div className="items">
                
                {allAppointments && allAppointments.map((val) => {
                  return (
                    <>
                      <div className="flex justify-center mb-4">
                        <Stack spacing={2} useFlexGap>
                          <Card variant="outlined" sx={{ width: 643 }}>
                            <CardContent orientation="horizontal">
                              <ImageListItem sx={{ width: 200 }}>
                                <img
                                  srcSet={val.customer.image}
                                  src={val.customer.image}
                                  loading="lazy"
                                />
                              </ImageListItem>
                              <div>
                                <Typography sx={{ overflow: "hidden" }}>
                                  <span className="text-info"> Service</span>-
                                  {val.service.service.name}
                                </Typography>
                                <Typography sx={{ overflow: "hidden" }}>
                                  <span className="text-info">
                                    {" "}
                                    Customer Name -{" "}
                                  </span>
                                  {val.customer.name}

                                  <hr />
                                </Typography>
                                <Typography sx={{ overflow: "hidden" }}>
                                  <CalendarMonthIcon className="mr-2" />{" "}
                                  {val.date}
                                </Typography>
                                <Typography sx={{ overflow: "hidden" }}>
                                  <AccessTimeRoundedIcon className="mr-2" />
                                  {val.time}
                                </Typography>
                                <Typography sx={{ overflow: "hidden" }}>
                                  <CurrencyRupeeRoundedIcon className="mr-2" />
                                  {val.service.servicefee}/-
                                </Typography>
                          
                                {val.status === "Confirmed" && (
                                  <span className="text-success">
                                    Service Completed
                                  </span>
                                )}
                              </div>
                            </CardContent>
                            <AspectRatio ratio="29/9">
                              <Typography sx={{ overflowY: "auto" }}>
                                <div
                                  onClick={() => addressHandler(val.id)}
                                  className="cur"
                                >
                                  STUDIO ADDRESS <ArrowDropDownIcon />
                                  {address === val.id && (
                                    <p>
                                      Address - {val.studio.locality} <br />{" "}
                                      {val.studio.place} <br />{" "}
                                      {val.studio.district} <br />{" "}
                                      {val.studio.state} <br />{" "}
                                      {val.studio.country} <br /> pincode -{" "}
                                      {val.studio.pincode} <br />{" "}
                                    </p>
                                  )}
                                </div>
                              </Typography>
                            </AspectRatio>
                          </Card>
                        </Stack>
                      </div>

                      {/* <div className="item flexSB">
                        <div className="img">
                          <img src={val.customer.image} alt="" />
                          <div className="text">
                            <h2 key={val.id}>{val.customer.name}</h2>
                            <hr />
                            <p>
                              Service -{val.service.service.name} <br />
                              Amount Paid - {val.service.servicefee}
                            </p>
                          </div>
                        </div>
                        <div className="text">
                          <p>
                            Date - {val.date} <br />
                            Time - {val.time}
                          </p>
                          <hr />
                          <div onClick={() => addressHandler(val.id)}>
                            ADDRESS <ArrowDropDownIcon />
                          </div>
                          {address === val.id && (
                            <p>
                              Address - {val.studio.locality} <br />{" "}
                              {val.studio.place} <br /> {val.studio.district}{" "}
                              <br /> {val.studio.state} <br />{" "}
                              {val.studio.country} <br /> pincode -{" "}
                              {val.studio.pincode} <br />{" "}
                            </p>
                          )}
                        </div>
                      </div> */}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {!allAppointments && (
          <div className=" justify-end">
            <Avatar src={emptypic} sx={{ width: 350, height: 350 }}></Avatar>
            <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
              NO BOOKINGS
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousBeautBookings;
