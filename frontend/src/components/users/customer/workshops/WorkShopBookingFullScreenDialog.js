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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from 'react-hot-toast';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WorkShopBookingFullScreenDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [beautName, setBeautName] = useState("");
  const [beautImage, setBeautImage] = useState("");
  const [paymentToggle, setPaymentToggle] = useState(false);

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
          setBeautImage(val.beautician.image)
        );
      });
  });

  return (
    <div>
        <Toaster/>
      <Button variant="outlined" onClick={handleClickOpen}>
        Book Now
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
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
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className="sub-heading-div flex justify-center align-center py-3 text-medium fw-2 sgfont  themecolor underline">
          {subject}
        </div>
        <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
          ONLINE WORKSHOP BY
        </div>
        <div className="flex justify-center align-center py-3 text-small">
          {beautName}
        </div>
        <div className="flex justify-center align-center py-3 ">
          <ImageListItem sx={{ width: 200 }}>
            <img srcSet={beautImage} src={beautImage} loading="lazy" />
          </ImageListItem>
        </div>
        <hr />
        <h4 className="flex justify-center align-center py-3 text-small" onClick={()=>setPaymentToggle((prev=>!prev))}>
          Choose Payment <ArrowDropDownIcon/>
        </h4>
        {
            paymentToggle && 
            <>
            <div className="flex justify-center cur">
             

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
            //   toast.success("Payment successfully completed!");
            //   localStorage.setItem(
            //     "bookedbeautid",
            //     reqdatas.value.bookbeautdata.id
            //   );
            //   localStorage.setItem(
            //     "bookedcustid",
            //     statedatas.value.custdetails.id
            //   );

            //   const datas = {
            //     beautid: reqdatas.value.bookbeautdata.id,
            //     custid: statedatas.value.custdetails.id,
            //     date: localStorage.getItem("date"),
            //     time: localStorage.getItem("time"),
            //     studio: localStorage.getItem("studio"),
            //     servicename: localStorage.getItem("service"),
            //     type:"paypal",
            //   };
             
            //   axiosInstance.post("cust/booknow/", datas).then((response) => {
            //     console.log(response, "RESRERSRERSRERSR");
            //   });

            //   setTimeout(navigate("../booking-completed"), 2000).catch(
            //     (error) => alert(error)
            //   );
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
            <Button variant="contained" color="primary" >
                    Pay Using Wallet
                </Button>

            </div>
            </>
        }


        <List>
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
        </List>
      </Dialog>
    </div>
  );
};

export default WorkShopBookingFullScreenDialog;
