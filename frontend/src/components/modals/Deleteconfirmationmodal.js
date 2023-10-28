import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axiosInstance from "../../axios/axiosconfig";
import { setReRender } from "../../feautures/rerenderslice";
import { setStudiodatas } from "../../feautures/beautician/studioformslice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Deleteconfirmationmodal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch=useDispatch()

  const handleSubmit = () => {
    if (props.item_to_delete == "studio") {
      const datas = {
        studioid: props.id,
      };
      console.log(datas, "ID NOKK BROOOOO");
      console.log(props.item_to_delete, "ITEM NOKK BROOOOO");
      axiosInstance
        .post("beaut/deletestudio/", datas)
        .then((response) => {
          console.log(response.data);
          props.set(response.data.studios)
          toast.success("Studio Address Deleted")

      //     const beautdetails = localStorage.getItem("singledetails-B");
      //     const parsed = JSON.parse(beautdetails);
      
      //     const datas = {
      //       beautid: parsed.id,
      //     };
      //     axiosInstance
      // .post("beaut/getstudios/", datas)
      // .then((res) => {
      //   console.log(res.data);
      //   if (res.data.message === "success"){
      //     props.set(res.data.studios)
      //     toast.success("Address Deleted!")

      //   }
      //   //localStorage.setItem("studios-B", JSON.stringify(res.data.studios));
      //   //dispatch(setStudiodatas(res.data.studios));
      
      // })
      // .catch((err) => alert(err));



      //     handleClose();
      //     // rerenderit();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  return (
    <div>
      <Toaster/>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          marginTop: "10px",
          backgroundColor: "inherit",
          color: "black",
          marginLeft: 2,
          "&:hover": {
            backgroundColor: "#212529",
            color: "#D0D4D9",
          },
        }}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: "#be0032 " }}
            >
              {" "}
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ backgroundColor: "#be0032 ", marginLeft: "2vw" }}
            >
              {" "}
              Close
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Deleteconfirmationmodal;
