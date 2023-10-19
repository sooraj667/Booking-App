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

const AddToFavouritesModal = (props) => {
    const variables = useSelector((state) => state.variables);
   
    const [open, setOpen] = useState(false);
    




    const handleSubmit = () => {


      let datas={}

      if (props.id){
       datas = {
          bookingid: props.id,
          
        };

      }
      else if(props.myid){
        datas = {
          myid: props.myid,
          custid:JSON.parse(localStorage.getItem("singledetails-C")).id
          
        };

      }

      console.log(datas,"HEYNIMA");

        
        
     
    
        axiosInstance
          .post("cust/add-to-favourites/", datas)
          .then((response) => {
            if (response.data.message === "already_present") {
                setOpen(false);
                toast("Already in favourites!")
     
              return
            }
            if (response.data.message === "done") {
              setOpen(false);
              toast.success("Added to favourites!");
       
            }
         
          })
          .catch((error) => {
            alert(error);
          });
      };
  return (
    <React.Fragment>
        {console.log(props.id,"ITHANID")}
      <Button
        variant="plain"
        onClick={() =>{
            
            setOpen(true)

        } }
        // sx={{
        //     marginTop: "10px",
        //     backgroundColor: "inherit",
        //     color: "#900603",
        //     "&:hover": {
        //       backgroundColor: "#212529",
        //       color: "#D0D4D9", // Specify the desired background color on hover
        //     },
        //   }}
      >
        ADD TO FAVOURITES
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
              <DialogTitle> ADD TO FAVOURITES</DialogTitle>
              <hr />

              <DialogContent>
                Add to your favourite beauticians?
                
                <br />
                <br />
                <Button onClick={handleSubmit}>Confirm</Button>
                <Button onClick={()=>setOpen(false)} >Close</Button>
                
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  )
}

export default AddToFavouritesModal