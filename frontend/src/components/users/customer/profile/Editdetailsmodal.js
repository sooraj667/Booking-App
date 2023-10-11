import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setAllservices, setServices } from "../../../../feautures/loginslice";
import axiosInstance from "../../../../axios/axiosconfig";
import { setCustDetails } from "../../../../feautures/loginslice";
import {
  changeEmail,
  changePName,
  changePhone,
} from "../../../../feautures/beautslice";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

const Editdetailsmodal = () => {
    const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);
  const formdatas = useSelector((state) => state.signup);
  const [open, setOpen] = useState(false);
  const [changed, setChanged] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const allcustdatas = localStorage.getItem("singledetails-C");
    const parsed = JSON.parse(allcustdatas);
    dispatch(setCustDetails(parsed));
  }, [changed]);

  const handleUpdate = () => {
      const datas = {
      id: statedatas.value.custdetails.id,
      name: formdatas.value.pname,
      email: formdatas.value.email,
      phone: formdatas.value.phone,
    };
    console.log(formdatas.value.pname, "##############333");
    axiosInstance
      .post("cust/editdetails/", datas)
      .then((res) => {
      
        localStorage.setItem(
          "singledetails-C",
          JSON.stringify(res.data.allcustdatas)
        );
       
        setChanged((prev) => !prev);
        handleClose();
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ marginBottom: "0px", marginLeft: "10px", marginTop: "50px",backgroundColor:"inherit",color:"black",'&:hover': {
          backgroundColor: '#212529',color:"#D0D4D9" // Specify the desired background color on hover
        } }}
      >
        Edit Details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              marginLeft: "90px",
              marginBottom: "30px",
            }}
          >
            Edit Details
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div class="card-body">
              <div class="form-group">
                <div className="row">
                  <label for="username" className="mr-3">
                    Name:
                  </label>
                  <TextField
                    variant="standard"
                    onChange={(e) => dispatch(changePName(e.target.value))}
                  />
                </div>
                <span className="text-danger">{formdatas.value.error.pname}</span>
              </div>

              <div class="form-group">
                <div className="row">
                  <label for="email" className="mr-3">
                    Email:
                  </label>
                  <TextField
                    variant="standard"
                    onChange={(e) => dispatch(changeEmail(e.target.value))}
                  />
                </div>
                <span className="text-danger">{formdatas.value.error.email}</span>
              </div>

              <div class="form-group">
                <div className="row">
                  <label for="password" className="mr-3">
                    Phone:
                  </label>
                  <TextField
                    type="numtextber"
                    variant="standard"
                    required
                    onChange={(e) => dispatch(changePhone(e.target.value))}
                  />
                </div>
                <span className="text-danger">{formdatas.value.error.phone}</span>
              </div>
              <Button variant="contained" onClick={handleUpdate}>
                Update

              </Button>

              

              
               
              

            
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Editdetailsmodal