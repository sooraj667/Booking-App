import React,{useState} from "react";
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
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const AddWorkshopModal = () => {
    const [open, setOpen] = useState(false);
    const [subject, setSubject] = useState(false);
    // const [open, setOpen] = useState(false);
    // const [open, setOpen] = useState(false);
    // const [open, setOpen] = useState(false);
    // const [open, setOpen] = useState(false);
    // const [open, setOpen] = useState(false);
    // const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
    
    <Fab size="small" color="secondary" aria-label="add" className="ml-2" onClick={()=>setOpen(true)}>
          <AddIcon />
        </Fab>
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
              <DialogTitle> ADD NEW WORKSHOP</DialogTitle>
              <hr />

              <DialogContent>
                Workshop Subject
                <input type="text" className='form-control' onChange={(e)=>setSubject(e.target.value)}/>
                <br />
                <br />
                <Button>Confirm</Button>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
};

export default AddWorkshopModal;
