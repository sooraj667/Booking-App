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
import { useDispatch } from "react-redux";
import { setBeautDetails } from "../../../../feautures/loginslice";

import AddIcon from '@mui/icons-material/Add';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const AddBioModal = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const allbeautdatas = localStorage.getItem("singledetails-B");
    const parsed = JSON.parse(allbeautdatas);
    dispatch(setBeautDetails(parsed));
  }, [changed]);

  const handleBioChange=(e)=>{
    setContent(e.target.value)
  }

  const handleBioSubmit=()=>{
    const datas={
        id:props.id,
        content:content
    }
    axiosInstance.post("beaut/add-bio/",datas).then((response)=>{
        localStorage.setItem(
            "singledetails-B",
            JSON.stringify(response.data.allbeautdatas)
          );
          setChanged((prev) => !prev);

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
        sx={{ marginBottom: "0px", marginLeft: "10px", marginTop: "50px",backgroundColor:"inherit",color:"black",'&:hover': {
            backgroundColor: '#212529',color:"#D0D4D9" // Specify the desired background color on hover
          } }}
      >
        ADD BIO <AddIcon/>
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
              <DialogTitle>Add Bio</DialogTitle>
              <hr />

              <DialogContent>
                Please add a catching bio which describes your skill in your field!
                <input type="text" className='form-control' onChange={handleBioChange}/>
              
                <br />
                <br />
                <Button onClick={handleBioSubmit}>Confirm</Button>
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