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
    const allbeautdatas = localStorage.getItem("singledetails-B");
    const parsed = JSON.parse(allbeautdatas);
    dispatch(setBeautDetails(parsed));
  }, [changed]);

  const handleUpdate = () => {
    const datas = {
      id: statedatas.value.beautdetails.id,
      name: name,
      email: email,
      phone: phone,
    };
    console.log(datas, "##############333");
    axiosInstance
      .post("beaut/editdetails/", datas)
      .then((res) => {
        localStorage.setItem(
          "singledetails-B",
          JSON.stringify(res.data.allbeautdatas)
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
        sx={{ marginBottom: "0px", marginLeft: "220px", marginTop: "100px" }}
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
            <div className="row">
              <label> Name</label>
              <Input
                size="md"
                placeholder=""
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label>Email</label>
              <Input
                size="md"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Phone</label>
              <Input
                size="md"
                placeholder=""
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="row">
              <Button
                variant="contained"
                sx={{
                  marginTop: "20px",
                  marginLeft: "40px",
                }}
                onClick={handleUpdate}
              >
                Update
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

export default Editdetailsmodal;
