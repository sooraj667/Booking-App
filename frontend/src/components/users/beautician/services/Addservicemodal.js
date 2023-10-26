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
import Input from "@mui/joy/Input";
import MuiAlert from "@mui/material/Alert";
import toast from "react-hot-toast";

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Addservicemodal = () => {
  const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);
  const [selectedService, setSelectedService] = useState(false);
  const [addServiceError, setAddServiceError] = useState(false);
  const [serviceFeeError, setServiceFeeError] = useState(false);

  const [serviceFee, setServiceFee] = useState(false);
  const [open, setOpen] = useState(false);
  const [changed, setChanged] = useState(false);
  const handleOpen = () => {
    setSelectedService(false)
    setServiceFee(false)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAddServiceError(false);
    setServiceFeeError(false);
  };

  useEffect(() => {
    const allservices = localStorage.getItem("allservices-B");
    const services = localStorage.getItem("services-B");
    const parsedallservices = JSON.parse(allservices);
    const parsedservices = JSON.parse(services);

    dispatch(setAllservices(parsedallservices));
    dispatch(setServices(parsedservices));
  }, [changed]);

  const handleAddService = () => {
    if (selectedService===false || serviceFee ===false){
      toast.error("Please add the values!")
      return
    }
    const datas = {
      servicename: selectedService,
      beautid: statedatas.value.beautdetails.id,
      servicefee: serviceFee,
    };
    console.log(datas, "*****CURRENT******");
    axiosInstance
      .post("beaut/addnewservice/", datas)
      .then((res) => {
        if (res.data.message == "Already Present") {
          setAddServiceError(true);
         
        } else {
          localStorage.setItem("services-B", JSON.stringify(res.data.services));
          setChanged((prev) => !prev);
          handleClose();
        }
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ marginBottom: "0px", marginLeft: "160px", marginTop: "30px",backgroundColor:"inherit",color:"#212529" , '&:hover': {
          backgroundColor: '#212529',color:"#D0D4D9" // Specify the desired background color on hover
        } }}
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
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  console.log(selectedService, "*********************");
                }}
              >
                {statedatas.value.allservices.map((item) => {
                  return <option>{item.name}</option>;
                })}
              </select>
              <label className="mt-4">Fee</label>
              <Input
                className="form-control"
                size="md"
                placeholder="Enter Fee"
                onChange={(e) =>{
                    const val=e.target.value
                    const regex = /^[0-9]+$/;   
                    if (regex.test(val)){
                        setServiceFee(e.target.value)
                        setServiceFeeError(false)

                    }
                    else{
                        setServiceFeeError(true)
                    }
                } }
              />
              {
                serviceFeeError&& 
                <span className="text-danger">Please Enter Valid Price!</span>
              }
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
              {addServiceError && (
                <Alert
                  severity="error"
                  sx={{
                    marginTop: "20px",
                    marginLeft: "70px",
                  }}
                >
                  Service Already Added!
                </Alert>
              )}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Addservicemodal;
