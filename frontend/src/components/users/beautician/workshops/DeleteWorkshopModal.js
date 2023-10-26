import React,{useState} from 'react'
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
import { useSelector, useDispatch } from "react-redux";
import { setAllWorkshops } from '../../../../feautures/beautician/workshopslice';



const DeleteWorkshopModal = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleCancelWorkshop=(id)=>{
        const datas={
            id:id
        }
    
        axiosInstance.post("beaut/cancel-workshop/",datas).then((response)=>{
            dispatch(setAllWorkshops(response.data.allworkshops))
            setOpen(false)
            
        }).catch((error)=>{
            alert(error)
        })
      }
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="danger"
        endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this workshop?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => handleCancelWorkshop(props.id)}>
              Delete
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

export default DeleteWorkshopModal