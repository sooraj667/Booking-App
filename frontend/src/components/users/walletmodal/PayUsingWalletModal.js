import React, { useState } from "react";
import { Transition } from "react-transition-group";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios/axiosconfig";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PayUsingWalletModal = () => {
  const [open, setOpen] = useState(false);
  const [bookingFee, setBookingFee] = useState(
    localStorage.getItem("selected_service_fee")
  );
  const [walletError, setWalletError] = useState(false);
  const reqdatas = useSelector((state) => state.custreqdata);
  const statedatas = useSelector((state) => state.login);
  const variables = useSelector((state) => state.variables);
  const navigate = useNavigate();

  const handleSubmit = () => {

    localStorage.setItem("bookedbeautid", reqdatas.value.bookbeautdata.id);
    localStorage.setItem("bookedcustid", statedatas.value.custdetails.id);
    const datas = {
      beautid: reqdatas.value.bookbeautdata.id,
      custid: statedatas.value.custdetails.id,
      date: localStorage.getItem("date"),
      time: localStorage.getItem("time"),
      studio: localStorage.getItem("studio"),
      servicename: localStorage.getItem("service"),
      type: "wallet",
    };

    axiosInstance
      .post("cust/booknow/", datas)
      .then((response) => {
        if (response.data.message === "not_enough_wallet_amount") {
          setWalletError(
            `Not enough wallet balance! Available balance is Rs.${response.data.available_amount}/-`
          );
          return;
        }
        if (response.data.message === "Appointmentdone") {
          setOpen(false);
          toast.success("Booking Confirmed!");
          setTimeout(() => {
            navigate("../booking-completed");
          }, 2000);
        }
     
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={() =>{
          const date= localStorage.getItem("date")
          const time= localStorage.getItem("time")
          const studio= localStorage.getItem("studio")
          const servicename= localStorage.getItem("service")
          console.log(`${date} ${time} ${studio} ${servicename}  ,MYRR`);
          if (!date || !time ||   !studio || !servicename ){
              toast.error("Select All values")
              return
          }
            setWalletError(false)
            setOpen(true)

        } }
        sx={{ bgcolor: "#FFC439" }}
      >
        Pay Using Wallet
      </Button>
      <Toaster />

      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <DialogTitle>Wallet Payment</DialogTitle>
              <hr />

              <DialogContent>
                Confirm Booking for Rs.
                {variables.value.booking_fee}/-
                <br />
                <br />
                <Button onClick={handleSubmit}>Confirm</Button>
                <Button onClick={()=>setOpen(false)} >Close</Button>
                {walletError && (
                  <Alert
                    severity="error"
                    sx={{
                      marginTop: "20px",
                      marginLeft: "70px",
                    }}
                  >
                    {walletError}
                  </Alert>
                )}
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
};

export default PayUsingWalletModal;
