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
import DoneAllIcon from '@mui/icons-material/DoneAll';

const PreviousBooking = () => {
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
      <div className="flex">
        {console.log(reqdatas.value.allappointments, "BYDUBAI")}

        <section className="aboutHome">
          <div className="container flexSB">
            {/* <div className='left row'>
            <img src={"https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80"} alt='' />
          </div> */}
            <div className="right row">
              {/* <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' /> */}
              <div className="items">
                {reqdatas.value.allappointments.map((val) => {
                  return (
                    <>
                      <div className="item flexSB">
                        <div className="img">
                          <img src={val.beautician.image} alt="" />
                          <div className="text">
                            <h2 key={val.id}>{val.beautician.name}</h2>
                            <hr />
                            <p>
                              Service -{val.service.service.name} <br />
                              Amount Paid - {val.service.servicefee}<br />
                              Status - <span className="text-success">Completed <DoneAllIcon/></span> <br />
                              
                            </p>
                            {/* <Button
                            onClick={()=>handleCancelItem(val.id)}
                            sx={{
                              marginTop: "10px",
                              backgroundColor: "inherit",
                              color: "#900603",
                              "&:hover": {
                                backgroundColor: "#212529",
                                color: "#D0D4D9", // Specify the desired background color on hover
                              },
                            }}>
                          Cancel Booking
                        </Button> */}
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
                                    <input type="text" className="form-control mt-3"/>
                                    
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose}>
                                    CLOSE
                                  </Button>
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

export default PreviousBooking;
