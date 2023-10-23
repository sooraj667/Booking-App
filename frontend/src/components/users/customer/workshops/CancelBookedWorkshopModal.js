import React from 'react'
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import axiosInstance from '../../../../axios/axiosconfig';
import toast, { Toaster } from 'react-hot-toast';

const CancelBookedWorkshopModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleSubmit=(id)=>{
        const datas={
            id:id,
            cust_id:JSON.parse(localStorage.getItem("singledetails-C")).id
        }
        axiosInstance.post("cust/cancel-workshop-booking/",datas).then((res)=>{
            
            toast.success('Booking Cancelled! Amount added to your wallet' )
            props.setReRender((prev)=>!prev)

        }).catch((error)=>{
            alert(error)
        })

    }
  return (
    <React.Fragment>
        <Toaster/>
      <div
       onClick={() => setOpen(true)}
      >
        Cancel Booking
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to cancel this workshop?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => handleSubmit(props.id)}>
              Confirm
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  )
}

export default CancelBookedWorkshopModal