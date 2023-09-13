import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setAllservices,setServices } from "../../../../feautures/loginslice";
import axiosInstance from "../../../../axios/axiosconfig";

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

const Addservicemodal = () => {
  const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);
  const [selectedService, setSelectedService] = useState("");
  const [open, setOpen] = useState(false);
  const [changed,setChanged]=useState(false)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const allservices = localStorage.getItem("allservices-B");
    const services=localStorage.getItem("services-B");
    const parsedallservices = JSON.parse(allservices);
    const parsedservices = JSON.parse(services);

    dispatch(setAllservices(parsedallservices));
    dispatch(setServices(parsedservices));
  }, [changed,]);

  const handleAddService = () => {
    const datas = {
      servicename: selectedService,
      beautid: statedatas.value.beautdetails.id,
    };
    axiosInstance
      .post("beaut/addnewservice/", datas)
      .then((res) =>{
        localStorage.setItem("services-B",JSON.stringify(res.data.services))
        setChanged((prev)=>!prev)


      } )
      .catch((error) => alert(error));
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ marginBottom: "0px", marginLeft: "220px", marginTop: "100px" }}
      >
        Add Service
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
            Add New Service
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="row">
              <label>Choose Service</label>
              <select
                id="mySelect"
                name="fruit"
                className="form-control"
                onChange={(e) => setSelectedService(e.target.value)}
              >
                {statedatas.value.allservices.map((item) => {
                  return <option>{item.name}</option>;
                })}
              </select>
            </div>
            <div className="row">
              <Button
                variant="contained"
                sx={{
                  marginTop: "20px",
                  marginLeft: "40px",
                }}
                onClick={handleAddService}
              >
                Add Service
              </Button>

              <Button
                onClick={handleClose}
                variant="contained"
                sx={{
                  marginTop: "20px",
                  marginLeft: "70px",
                  backgroundColor: "#DC143C",
                }}
              >
                Close
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Addservicemodal;
