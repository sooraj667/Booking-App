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
            <div className="flex justify-center cur">
                <Button>
                    Wallet
                </Button>
                <Button>
                    Razorpay
                </Button>

            </div>
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
