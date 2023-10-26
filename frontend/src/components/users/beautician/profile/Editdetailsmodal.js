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
import { setBeautDetails } from "../../../../feautures/loginslice";
import {
  changeEmail,
  changePName,
  changePhone,
} from "../../../../feautures/beautslice";
import Input from "@mui/joy/Input";
import toast, { Toaster } from "react-hot-toast";

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
  const [bio, setBio] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [bioError, setBioError] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const allbeautdatas = localStorage.getItem("singledetails-B");
    const parsed = JSON.parse(allbeautdatas);
    dispatch(setBeautDetails(parsed));
    setName(parsed.name);
    setEmail(parsed.email);
    setPhone(parsed.phone);
    if (parsed.bio!==" "){
      setBio(parsed.bio)
    }
  }, [changed]);

  const handleUpdate = () => {

    let datas={}
    if (bio===false){

      datas = {
        id: statedatas.value.beautdetails.id,
        name: name,
        email: email,
        phone: phone,
      }


    }
    else{
      datas = {
        id: statedatas.value.beautdetails.id,
        name: name,
        email: email,
        phone: phone,
        bio:bio,
      }

    }
    
    console.log(formdatas.value.pname, "##############333");
    axiosInstance
      .post("beaut/editdetails/", datas)
      .then((res) => {
        localStorage.setItem(
          "singledetails-B",
          JSON.stringify(res.data.allbeautdatas)
        );
        setTimeout(()=>{
          toast.success("Profile Details Updated!")

        },200)
        setChanged((prev) => !prev);
        
        
        handleClose();
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
      <Toaster />
      <Button
        onClick={()=>{

          setChanged((prev) => !prev);

          handleOpen()

        } }
        variant="outlined"
                sx={{ bgcolor: "background.level1" }}
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
                    value={name}
                    variant="standard"
                    onChange={(e) => {
                      if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                        setNameError("Name can only have alphabets");
                      } else {
                        setNameError(false);
                      }

                      setName(e.target.value);
                    }}
                  />
                  {nameError && (
                    <span className="text-danger"> {nameError} </span>
                  )}
                </div>
                
              </div>

              <div class="form-group">
                <div className="row">
                  <label for="email" className="mr-3">
                    Email:
                  </label>
                  <TextField
                    value={email}
                    variant="standard"
                    onChange={(e) => {
                      if (
                        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                          e.target.value
                        )
                      ) {
                        setEmailError("Wrong Email");
                      } else {
                        setEmailError(false);
                      }
                      setEmail(e.target.value);
                    }}
                  />
                  {emailError && (
                    <span className="text-danger"> {emailError} </span>
                  )}
                </div>
                
              </div>

              <div class="form-group">
                <div className="row">
                  <label for="password" className="mr-3">
                    Phone:
                  </label>
                  <TextField
                    value={phone}
                    type="numtextber"
                    variant="standard"
                    required
                    onChange={(e) => {
                      if (!/^(?!([0-9])\1{9})[0-9]{10}$/.test(e.target.value)) {
                        setPhoneError("Invalid Phone Number!");
                      } else {
                        setPhoneError(false);
                      }

                      setPhone(e.target.value);
                    }}
                  />
                  {phoneError && (
                    <span className="text-danger"> {phoneError} </span>
                  )}
                </div>
                
              </div>

              {
                bio &&
                <div class="form-group">
                <div className="row">
                  <label for="password" className="mr-3">
                    Bio:
                  </label>
                  <TextField
                    value={bio}
                    type="numtextber"
                    variant="standard"
                    required
                    onChange={(e) => {
                      if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                        setBioError("Bio can only have alphabets!");
                      } else {
                        setBioError(false);
                      }

                      setBio(e.target.value);
                    }}
                  />
                  {bioError && (
                    <span className="text-danger"> {bioError} </span>
                  )}
                </div>
                
              </div>
              }


              
             
             
              
               
              

            
            </div>
            <div className="modal-btns">
              <div className="">
                {nameError || emailError || phoneError ? null : (
                  <Button variant="contained" onClick={handleUpdate}>
                    Update
                  </Button>
                )}
              </div>
              <div className="">
                <Button variant="contained" onClick={handleClose}>Close</Button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Editdetailsmodal;
