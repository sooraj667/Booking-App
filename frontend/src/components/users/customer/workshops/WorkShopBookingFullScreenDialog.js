import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import axiosInstance from "../../../../axios/axiosconfig";
import ImageListItem from "@mui/material/ImageListItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WorkshopPayUsingWalletModal from "./WorkshopPayUsingWalletModal";
import Razorpay from "../../../razorpay/Razorpay";




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WorkShopBookingFullScreenDialog = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [beautName, setBeautName] = useState("");
  const [beautImage, setBeautImage] = useState("");
  const [workshopID, setWorkshopID] = useState("");
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [allReadyBooked, setAllReadyBoooked] = useState(false);
  const [amount, setAmount] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.allWorkShops
      .filter((item) => {
        return item.id === props.id;
      })
      .map((val) => {
        return (
          setSubject(val.subject),
          setBeautName(val.beautician.name),
          setBeautImage(val.beautician.image),
          setAmount(val.price),
          setWorkshopID(val.id)
        );
      });
      const datas={
        workshopid:props.id,
        custid:JSON.parse(localStorage.getItem("singledetails-C")).id
      }
    axiosInstance.post("cust/check-if-workshop-booked/",datas).then((res) => {
      if (res.data.message === "already-present") {
        setAllReadyBoooked(true);
      } else {
        setAllReadyBoooked(false);
      }
    });
  },[]);

  return (
    <div>
      <Toaster />
      <Button variant="outlined" onClick={handleClickOpen}>
        Book Now
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative",backgroundColor:"#202331" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            WORKSHOP BOOKING
            </Typography>
          
          </Toolbar>
        </AppBar>
        <div className="sub-heading-div flex justify-center align-center py-3 text-medium fw-2 sgfont  themecolor underline">
          {subject}
        </div>
        <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
          ONLINE WORKSHOP BY
        </div>
        <div className="flex justify-center align-center py-3 text-small fw-2">
          {beautName}
        </div>
        <div className="flex justify-center align-center py-3 text-small fw-2">
          Fee - <span className="text-info">Rs. {amount}</span>/-
        </div>
        <div className="flex justify-center align-center py-3 ">
          <ImageListItem sx={{ width: 200 }}>
            <img srcSet={beautImage} src={beautImage} loading="lazy" />
          </ImageListItem>
        </div>
        <hr />
        {
            !allReadyBooked ?
            <div className="">
          <h4
            className="flex justify-center align-center py-3 text-small cur"
            onClick={() => setPaymentToggle((prev) => !prev)}
          >
            Choose Payment <ArrowDropDownIcon />
          </h4>
          {paymentToggle && (
            <>
              <div className="flex justify-center cur ">
                <PayPalScriptProvider
                  options={{
                    clientId:
                      "AeaCyw6WUYkOvfUXMp0ScN2r6KEfhVvxWytZvEAlbUXH_NoQsJ70TyTabFoedoIEkqTTwI5kUtFoaauE",
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "1",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={() => {
                      toast.success("Payment successfully completed!");
                      const datas = {
                        workshopid: props.id,
                        custid: JSON.parse(
                          localStorage.getItem("singledetails-C")
                        ).id,
                        type: "paypal",
                      };

                      axiosInstance
                        .post("cust/workshop-booknow/", datas)
                        .then((response) => {
                          console.log(response, "RESRERSRERSRERSR");
                        });

                      setTimeout(
                        navigate("../workshop-booking-completed"),
                        2000
                      ).catch((error) => alert(error));
                    }}
                    onCancel={() => {
                      toast.error("You cancelled the payment!");
                    }}
                    onError={() => {
                      toast.error("Error!");
                    }}
                  />
                  <Toaster />
                </PayPalScriptProvider> 
              </div>
              <div className="flex justify-center">
              <Razorpay fee={amount} for={"workshop"} id={workshopID}/>

              </div>
              
              <div className="flex justify-center mb-4 mt-2">
                <WorkshopPayUsingWalletModal id={props.id} price={amount}/>
               
              </div>
            </>
          )}

          {/* <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Default notification ringtone"
                secondary="Tethys"
              />
            </ListItem>
          </List> */}
        </div>: <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
           You have already booked for this workshop! <TaskAltIcon className="text-success ml-2"/>

        </div>
        }
        
      </Dialog>
      <hr />
      {console.log(`${props.id} and ${props.allWorkShops}`)}
    </div>
  );
};

export default WorkShopBookingFullScreenDialog;
