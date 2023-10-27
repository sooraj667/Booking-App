import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
// import { setAllservices,setServices } from "../../../../feautures/loginslice";
import axiosInstance from "../../../axios/axiosconfig";
import Input from "@mui/joy/Input";
import { storage } from "../../../firebase/firebaseconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { setAllservices } from "../../../feautures/adminDataAssignerSlice";
import toast, { Toaster } from "react-hot-toast";
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

const Addnewservicemodal = () => { 
  const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);
  const [servicename, setServicename] = useState(false);
  const [servicedesc, setServicedesc] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [changed, setChanged] = useState(false);
  const [open, setOpen] = useState(false);
  //   const [changed,setChanged]=useState(false)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddService = () => {
    const datas = {
      servicename: servicename,
      servicedesc: servicedesc,
    };
    axiosInstance
      .post("adminside/addnewservice/", datas)
      .then((res) => {
        localStorage.setItem(
          "allservices",
          JSON.stringify(res.data.allservices)
        );
        // setChanged((prev)=>!prev)
      })
      .catch((error) => alert(error));
  };

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
    // console.log(URL.createObjectURL(e.target.files[0]));
    // return setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    if(selectedImage===false || servicedesc===false ||servicename===false ){
      toast.error("Please enter values for all the fields!")  
      return
    }
    const reference = ref(storage, `services/${selectedImage.name + v4()}`);
    uploadBytes(reference, selectedImage)
      .then((res) => {
        getDownloadURL(reference).then((url) => {
          console.log(url, "PRINTED");
          const datas = {
            imageurl: url,
            servicename: servicename,
            servicedesc: servicedesc,
          };
          axiosInstance
            .post("adminside/addnewservice/", datas)
            .then((response) => {
              console.log(response.data.allservices, "ALLSERVICES");
              console.log("ALL SET");
              localStorage.setItem(
                "allservices",
                JSON.stringify(response.data.allservices)
              );
              setChanged(true);
              handleClose();
            });
        });
      })
      .catch(() => {
        console.log("Error");
      });
  };

  useEffect(() => {
    const allservices = localStorage.getItem("allservices");
    const parsed = JSON.parse(allservices);
    dispatch(setAllservices(parsed));
  }, [changed]);

  return (
    <div>
      <Toaster/>
      <div>
        <AddCircleIcon onClick={handleOpen} />
        {/* <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ marginBottom: "0px", marginLeft: "220px", marginTop: "100px" }}
        >
          Add Service
        </Button> */}
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
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Service name:</label>
                  </div>
                  <div className="col-md-6">
                    <Input
                      size="md"
                     
                      onChange={(e) => setServicename(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 ">
                  <label>Description:</label>
                  </div>
                  <div className="col-md-6 ">
                  <Input
                    size="md"
                    
                    onChange={(e) => setServicedesc(e.target.value)}
                  />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                  <label>Image:</label>
                  </div>
                  <div className="col-md-6 mr-2">
                  <input
                    className="selectimage"
                    accept="image/*"
                    id="upload-button"
                    type="file"
                    onChange={handleFileChange}
                  />
                  </div>
                </div>

                

           
               

             

                  {/* <Button
                type="file"
                onClick={uploadImageHandler}
                variant="contained"
                startIcon={<DriveFolderUploadIcon />}
                sx={{ marginTop: "10px" }}
                size="small"
              >
                Upload
              </Button> */}
               

                {/* <select
                id="mySelect"
                name="fruit"
                className="form-control"
                onChange={(e) => setServicename(e.target.value)}
              >
                {statedatas.value.allservices.map((item) => {
                  return <option>{item.name}</option>;
                })}
              </select> */}
              </div>
              <div className="row">
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "20px",
                    marginLeft: "40px",
                  }}
                  onClick={handleSubmit}
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
    </div>
  );
};

export default Addnewservicemodal;
