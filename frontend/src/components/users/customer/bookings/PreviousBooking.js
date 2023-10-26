import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllappointments } from "../../../../feautures/customer/customerdataslice";
import axiosInstance from "../../../../axios/axiosconfig";
import "./Bookings.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast, { Toaster } from "react-hot-toast";
import { toggleBookings } from "../../../../feautures/customer/customernavigationslice";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { setAddToFavouritesBookingId } from "../../../../feautures/variableSlice";
import AddToFavouritesModal from "./AddToFavouritesModal";

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

const PreviousBooking = () => {
  const reqdatas = useSelector((state) => state.custreqdata);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [cancelItemId, setCancelItemID] = useState("");
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(false);
  const [bookingToggleHandler, setBookingToggleHandler] = useState(false);
  const [reviewContent, setReviewContent] = useState("myr");

  useEffect(() => {
    const custdetails = JSON.parse(localStorage.getItem("singledetails-C"));
    console.log(custdetails, "################3");

    const datas = {
      custid: custdetails.id,
    };
    axiosInstance
      .post("cust/get-previous-bookings/", datas)
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
  }, [render]);

  const addressHandler = (id) => {
    if (address == "") {
      setAddress(id);
    } else {
      setAddress("");
    }
  };

  const handleCancelItem = (id) => {
    setCancelItemID(id);
    handleClickOpen();
  };

  const handleAddToFavouritesItem = (id) => {
    dispatch(setAddToFavouritesBookingId(id));
    // handleClickOpen();
  };

  const handleSubmit = () => {
    const datas = {
      bookingid: cancelItemId,
      reviewcontent: reviewContent,
    };
    axiosInstance
      .post("cust/add-review/", datas)
      .then((response) => {
        console.log(response.data, "FRESHHH");

        setRender((prev) => !prev);
        toast.success("Review Added!");
      })
      .catch((error) => alert(error));

    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const previouBookingClickHandler = () => {
    dispatch(toggleBookings());
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

        <section className="">
          <div className=" ">
            {/* <div className='left row'>
            <img src={"https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80"} alt='' />
          </div> */}
            <div className="">
              {/* <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' /> */}
              <div className="">
                {reqdatas.value.allappointments.map((val) => {
                  return (
                    <>
                      <div className="flex justify-center mb-4">
                        <Stack spacing={2} useFlexGap>
                          <Card variant="outlined" sx={{ width: 643 }}>
                            <CardContent orientation="horizontal">
                              <ImageListItem sx={{ width: 200 }}>
                                <img
                                  srcSet={val.beautician.image}
                                  src={val.beautician.image}
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
                                    Appointment With -{" "}
                                  </span>
                                  {val.beautician.name}

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

                                {val.status !== "Cancelled" && (
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

                            <div>
                              <Button
                                variant="outlined"
                                onClick={() => handleCancelItem(val.id)}
                                sx={{
                                  marginTop: "10px",
                                  backgroundColor: "inherit",
                                  color: "#900603",
                                  "&:hover": {
                                    backgroundColor: "#212529",
                                    color: "#D0D4D9", // Specify the desired background color on hover
                                  },
                                }}
                              >
                                ADD REVIEW
                              </Button>

                              <AddToFavouritesModal id={val.id} />

                              <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"ADD REVIEW "}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    How was your experience?
                                    <input
                                      type="text"
                                      className="form-control mt-3"
                                      onChange={(e) => {
                                        setReviewContent(e.target.value);
                                      }}
                                    />
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose}>CLOSE</Button>
                                  <Button onClick={handleSubmit} autoFocus>
                                    CONFIRM
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </Card>
                        </Stack>
                      </div>

                      {/* <div className="item flexSB">
                        <div className="img">
                          <img src={val.beautician.image} alt="" />
                          <div className="text">
                            <h2 key={val.id}>{val.beautician.name}</h2>
                            <hr />
                            <p>
                              Service -{val.service.service.name} <br />
                              Amount Paid - {val.service.servicefee}
                              <br />
                              Status -{" "}
                              <span className="text-success">
                                Completed <DoneAllIcon />
                              </span>{" "}
                              <br />
                            </p>
                           
                            <div>
                              <Button
                                variant="outlined"
                                onClick={() => handleCancelItem(val.id)}
                                sx={{
                                  marginTop: "10px",
                                  backgroundColor: "inherit",
                                  color: "#900603",
                                  "&:hover": {
                                    backgroundColor: "#212529",
                                    color: "#D0D4D9", // Specify the desired background color on hover
                                  },
                                }}
                              >
                                ADD REVIEW
                              </Button>


                              
                              <AddToFavouritesModal id={val.id}/>


                              <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"ADD REVIEW "}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    How was your experience?
                                    <input
                                      type="text"
                                      className="form-control mt-3"
                                      onChange={(e) => {
                                        setReviewContent(e.target.value);
                                      }}
                                    />
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose}>CLOSE</Button>
                                  <Button onClick={handleSubmit} autoFocus>
                                    CONFIRM
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                        <div className="text">
                          <p>
                            {console.log(reviewContent)}
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
      </div>
    </div>
  );
};

export default PreviousBooking;
