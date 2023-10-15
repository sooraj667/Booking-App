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
    changePlace,changeLocality,changeDistrict,changeState,changeCountry,changePincode,setStudiodatas
} from "../../../../feautures/beautician/studioformslice";
import Input from "@mui/joy/Input";

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

const Editstudiomodal = ({studioId}) => {
  const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);
  const formdatas = useSelector((state) => state.studioform);
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
    console.log(studioId,"STUDIOID");
   
    const studios = localStorage.getItem("studios-B");
    const parsed = JSON.parse(studios);
    dispatch(setStudiodatas(parsed));
  }, [changed]);

  const handleUpdate = () => {
    const beautdetails=localStorage.getItem("singledetails-B")
    const beautparsed=JSON.parse(beautdetails)
    

    const datas = {
      studioid:studioId,
      beautid: beautparsed.id,
      locality: formdatas.value.locality,
      place: formdatas.value.place,
      district: formdatas.value.district,
      state: formdatas.value.state,
      country: formdatas.value.country,
      pincode: formdatas.value.pincode,
    };
    
    axiosInstance
      .post("beaut/editstudio/", datas)
      .then((res) => {
        localStorage.setItem(
          "studios-B",
          JSON.stringify(res.data.studios)
        );
        console.log(res.data.studios,"ITHAAN STUDIOS");
        setChanged((prev) => !prev);
        handleClose();
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
        <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          marginTop: "10px",
          backgroundColor: "inherit",
          color: "black",
          marginLeft:2,
          "&:hover": {
            backgroundColor: "#212529",
            color: "#D0D4D9",
          },
        }}
      >
        Edit
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
                    Locality:
                  </label>
                  <TextField
                    variant="standard"
                    onChange={(e) => dispatch(changeLocality(e.target.value))}
                  />
                </div>
                <span className="text-danger">{formdatas.value.error.locality}</span>
              </div>

              <div class="form-group">
                <div className="row">
                  <label for="email" className="mr-3">
                    Place:
                  </label>
                  <TextField
                    variant="standard"
                    onChange={(e) => dispatch(changePlace(e.target.value))}
                  />
                </div>
                <span className="text-danger">{formdatas.value.error.place}</span>
              </div>

              <div class="form-group">
                <div className="row">
                  <label for="password" className="mr-3">
                    District:
                  </label>
                  <TextField
                    type="numtextber"
                    variant="standard"
                    required
                    onChange={(e) => dispatch(changeDistrict(e.target.value))}
                  />
                </div>
                <span className="text-danger">{formdatas.value.error.district}</span>
              </div>

              <div class="form-group">
                <div className="row">
                  <label for="password" className="mr-3">
                    State:
                  </label>
                  <TextField
                    type="numtextber"
                    variant="standard"
                    required
                    onChange={(e) => dispatch(changeState(e.target.value))}
                  />
                </div>
                <span className="text-danger">{formdatas.value.error.state}</span>
              </div>

              <div class="form-group">
                <div className="row">
                  <label for="password" className="mr-3">
                    Country:
                  </label>
                  <TextField
                    type="numtextber"
                    variant="standard"
                    required
                    onChange={(e) => dispatch(changeCountry(e.target.value))}
                  />
                </div>
                <span className="text-danger">{formdatas.value.error.country}</span>
              </div>

              <div class="form-group">
                <div className="row">
                  <label for="password" className="mr-3">
                    Pincode:
                  </label>
                  <TextField
                    type="numtextber"
                    variant="standard"
                    required
                    onChange={(e) => dispatch(changePincode(e.target.value))}
                  />
                </div>
                <span className="text-danger">{formdatas.value.error.pincode}</span>
              </div>

              <Button variant="contained" onClick={handleUpdate}>
                Update

              </Button>

              

              
               
              

            
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>


    </div>
  )
}

export default Editstudiomodal