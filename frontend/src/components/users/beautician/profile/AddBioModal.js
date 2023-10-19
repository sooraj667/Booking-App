import React,{useState} from 'react'
import { Transition } from "react-transition-group";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { useSelector } from "react-redux";
import axiosInstance from '../../../../axios/axiosconfig';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const AddBioModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={() =>{
      
            setOpen(true)

        } }
        sx={{ marginBottom: "0px", marginLeft: "10px", marginTop: "50px",backgroundColor:"inherit",color:"black",'&:hover': {
            backgroundColor: '#212529',color:"#D0D4D9" // Specify the desired background color on hover
          } }}
      >
        ADD BIO
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
              
                <br />
                <br />
                <Button >Confirm</Button>
                <Button onClick={()=>setOpen(false)} >Close</Button>
                {/* {walletError && (
                  <Alert
                    severity="error"
                    sx={{
                      marginTop: "20px",
                      marginLeft: "70px",
                    }}
                  >
                    f
              
                  </Alert>
                )} */}
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  )
}

export default AddBioModal