import React, { useState } from "react";
import { Transition } from "react-transition-group";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import MuiAlert from "@mui/material/Alert";
import axiosInstance from "../../../../axios/axiosconfig";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WorkshopPayUsingWalletModal = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [walletError, setWalletError] = useState(false);
  const handleSubmit = () => {
    const datas = {
      workshopid: props.id,
      custid: JSON.parse(localStorage.getItem("singledetails-C")).id,
    };
    axiosInstance
      .post("cust/workshop-booknow-using-wallet/", datas)
      .then((res) => {
        if (res.data.message === "not-enough-wallet-money") {
          setWalletError("Sorry! Not enough wallet money to make this payment");
        } else {
          setWalletError(false);
          toast.success("Payemnt Successfull");
          setTimeout(() => navigate("../workshop-booking-completed"), 2000);
        }
   
      })
      .catch(() => {
        alert("ERROR");
      });
  };
  return (
    <React.Fragment>
      <Toaster />
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)} >
        Pay Using Wallet
      </Button>
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
              <DialogTitle>Transition modal</DialogTitle>
              <DialogContent>
                Confirm Booking for Rs.
                {props.price}/-
                <br />
                <br />
                <Button onClick={handleSubmit}>Confirm</Button>
                <Button onClick={() => setOpen(false)}>Close</Button>
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

export default WorkshopPayUsingWalletModal;
