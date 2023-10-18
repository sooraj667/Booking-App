import React,{useState} from 'react'
import { Transition } from 'react-transition-group';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../axios/axiosconfig';

const PayUsingWalletModal = () => {
    const [open, setOpen] = useState(false);
    const [bookingFee,setBookingFee]=useState(localStorage.getItem("selected_service_fee"))
    const reqdatas = useSelector((state) => state.custreqdata);
    const statedatas = useSelector((state) => state.login);
    const variables=useSelector((state)=>state.variables)

    const handleSubmit=()=>{
        const datas = {
            beautid: reqdatas.value.bookbeautdata.id,
            custid: statedatas.value.custdetails.id,
            date: localStorage.getItem("date"),
            time: localStorage.getItem("time"),
            studio: localStorage.getItem("studio"),
            servicename: localStorage.getItem("service"),
            type:"wallet",
          };
         
          axiosInstance.post("cust/booknow/", datas).then((response) => {
            console.log(response, "RESRERSRERSRERSR");
          }).catch((error)=>{
            alert(error)
          });
          setOpen(false)
    }
  return (
    <React.Fragment>
      <Button variant="contained"  onClick={() => setOpen(true)} sx={{bgcolor:"#FFC439"}}>
        Pay Using Wallet
      </Button>
    
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!['exited', 'exiting'].includes(state)}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: 'none',
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                    entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === 'exited' ? 'hidden' : 'visible',
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
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  )
}

export default PayUsingWalletModal