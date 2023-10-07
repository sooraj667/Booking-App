import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axiosInstance from '../../../axios/axiosconfig';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';


import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',    
    boxShadow: 24,
    p: 4,
  };


const ForgotpwModal = () => {
  const [email,setEmail]=useState("")
  const [emailError,setEmailError]=useState(false)
  const [open, setOpen] = useState(false);
  const [snackopen, setSnackopen] = useState(false);
  const forgotpassword=useSelector((state)=>state.forgotpassword)



  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setEmailError(false)
    setOpen(false);

  }


  const handleSubmit=()=>{
    const datas={
        email:email
    }
     if (forgotpassword.value.beautician===true){
      axiosInstance.post("beaut/forgotpassword/",datas).then((res)=>{
        console.log("Main Success");
        if(res.data.message==="success"){
            console.log("Mail Sent");
            
            setEmailError(false)
            handleClose()
            localStorage.setItem("forgotpassword-id-beautician",res.data.id)
            setSnackopen(true)
        }
        if(res.data.message==="failed"){
            console.log("Invalid Email");
            setEmailError(true)
            
        }
        
    }).catch((error)=>{
        console.log(error,"ERROR");
    })


     }
     if (forgotpassword.value.customer===true){
      axiosInstance.post("cust/forgotpassword/",datas).then((res)=>{
        console.log("Main Success");
        if(res.data.message==="success"){
            console.log("Mail Sent");
            
            setEmailError(false)
            handleClose()
            localStorage.setItem("forgotpassword-id",res.data.id)
            setSnackopen(true)
        }
        if(res.data.message==="failed"){
            console.log("Invalid Email");
            setEmailError(true)
            
        }
        
    }).catch((error)=>{
        console.log(error,"ERROR");
    })

     }
    
  }
  return (
    <div>
 
      <div onClick={handleOpen} className="forgotpw">Forgot Password?</div>
      {console.log(forgotpassword.value,"SOORAJJ")}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-4">
           Forgot Password
          </Typography>
          <hr />
          <span className='email mb-3'>Email</span>
          <input type="text" className='form-control mt-2' placeholder='Enter your Email'  onChange={(e)=>setEmail(e.target.value)}/>
          <div className="row mt-4">
            <div className="col-md-6">
                <Button className='text-success' onClick={handleSubmit}>Send Mail</Button>

            </div>
            <div className="col-md-6">
            <Button onClick={handleClose} className="text-danger">Close</Button>
            

            </div>
          </div>
          <div className="row ml-5">
                {
                    emailError&&     <Alert severity="error" sx={{
                        marginTop:'20px',marginLeft:"30px"
                    
                      }}>Invalid Email!</Alert>
                }
            
            </div>
           
          
        </Box>
      </Modal>
      <Snackbar open={snackopen} autoHideDuration={6000} onClose={()=>setSnackopen(false)} sx={{marginLeft:50}}>
        <Alert onClose={()=>setSnackopen(false)} severity="success" sx={{ width: '100%'  }}>
          Email Sent! Check your gmail to change password
        </Alert>
      </Snackbar>
     
    </div>
    
  )
}

export default ForgotpwModal