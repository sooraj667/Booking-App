import React,{useState,useEffect} from 'react'
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
import {setServices} from "../../../../feautures/loginslice"
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
const AddToExpertiseModal = (props) => {
    const [open, setOpen] = useState(false);
    const [changed, setChanged] = useState(false);
    // const [alreadyPresent, setAlreadyPresent] = useState(false);
    const dispatch=useDispatch()

    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
       
      };


    useEffect(() => {
       
        const services = localStorage.getItem("services-B");
        const parsedservices = JSON.parse(services);
        dispatch(setServices(parsedservices));
      }, [changed]);
  
    const handleSubmit=()=>{
        const datas={
            id:props.id
        }
        axiosInstance.post("beaut/add-to-expertise/",datas).then((response)=>{
            if(response.data.message=="already-it-is"){
                
                toast("Already in expertise ")
                handleClose(); 
                return

            }
            localStorage.setItem("services-B", JSON.stringify(response.data.services));
            setChanged((prev) => !prev);
            toast.success("Added to expertise")
            handleClose();            
         
        }).catch((error)=>{
            alert(error)
        })
    }
  return (
    <React.Fragment>
      
      <Button
        variant="contained"
        onClick={() =>{
          
            setOpen(true)

        } }
      
      >
        <EditIcon/>
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
              <DialogTitle>MAKE AS EXPERTISE</DialogTitle>
              <hr />

              <DialogContent>
                Are you sure you want to make this service as your expertise?
 
                <br />
                <br />
                <Button onClick={handleSubmit}>Confirm</Button>
                <Button onClick={()=>setOpen(false)} >Close</Button>
                {/* {alreadyPresent && (
                  <Alert
                    severity="error"
                    sx={{
                      marginTop: "20px",
                      marginLeft: "70px",
                    }}
                  >
                    {alreadyPresent}
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

export default AddToExpertiseModal