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
import { togglePreviousBooking } from "../../../../feautures/customer/customernavigationslice";



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

const Booking = () => {
  const reqdatas = useSelector((state) => state.custreqdata);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [cancelItemId, setCancelItemID] = useState("");
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(false);
  const [bookingToggleHandler, setBookingToggleHandler] = useState(false);

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

  const handleSubmit = () => {
    const datas = {
      bookingid: cancelItemId,
    };
    axiosInstance
      .post("cust/cancel-booking/", datas)
      .then((response) => {
        console.log(response.data, "FRESHHH");

        setRender((prev) => !prev);
        toast.success("Booking Cancelled! Amount added to your wallet");
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
    dispatch(togglePreviousBooking());
  };

  return (
    <div className="booking-outer ">
      <Toaster />
      <div
        className="booking-hero"
        onClick={() => setBookingToggleHandler((prev) => !prev)}
      >
        BOOKINGS <ArrowDropDownIcon />
      </div>
      {bookingToggleHandler && (
        <div className="previous-booking" onClick={previouBookingClickHandler}>
          PREVIOUS BOOKINGS
        </div>
      )}

      <hr />
      <div className="flex justify-center">
        {console.log(reqdatas.value.allappointments, "BYDUBAI")}

        <section className="">
          <div className="">
            {/* <div className='left row'>
            <img src={"https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80"} alt='' />
          </div> */}
            <div className="">
              {/* <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' /> */}
              <div className=" ">
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
                                {val.status === "Cancelled" && (
                                  <span className="text-danger">
                                    Booking Cancelled
                                  </span>
                                )}
                                {val.status === "Confirmed" && (
                                  <span className="text-success">
                                    Booking Confirmed
                                  </span>
                                )}
                                {/* <Typography sx={{ overflow: "hidden" }}>
                        <CalendarMonthIcon className="mr-2"/>{item.status}
                        </Typography> */}
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

                            {val.status === "Confirmed" && (
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
                                CANCEL BOOKING
                              </Button>
                            )}

                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {"Cancel Booking? "}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Are You sure you want to cancel?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>CLOSE</Button>
                                <Button onClick={handleSubmit} autoFocus>
                                  CONFIRM
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </Card>
                        </Stack>
                      </div>
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

export default Booking;

{
  /* <div> */
}
{
  /* <Topstackcust/> */
}
{
  /* <div className="row">
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
      > */
}

{
  /* <div
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
    </div> */
}
