import React,{useState} from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector,useDispatch } from "react-redux";
import "./Profile.css";
import Editdetailsmodal from "./Editdetailsmodal";

import {storage} from "../../../../firebase/firebaseconfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Topstack from "../Topstack";
import axiosInstance from "../../../../axios/axiosconfig";
import {setBeautDetails} from "../../../../feautures/loginslice"



const Profile = () => {
  const statedatas = useSelector((state) => state.login);
  const [addImage, setAddImage] = useState(false);
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch=useDispatch()

  const addImageHandler = () => {
    setAddImage((addImage) => !addImage);

    // console.log(datas.value.beautdetails.id);
  };

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
    // console.log(URL.createObjectURL(e.target.files[0]));
    // return setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImageHandler = () => {
    const reference = ref(storage, `beautician/${selectedImage.name + v4()}`);
    uploadBytes(reference, selectedImage)
      .then((res) => {
        getDownloadURL(reference).then((url) => {
          console.log(url, "PRINTED");
          const datas = {
            imageurl: url,
            id: statedatas.value.beautdetails.id,
          };
          axiosInstance.post("beaut/changeimage/", datas).then((response) => {
            console.log(response.data);
            if (response.data.message == "Added") {
              console.log("ALL SET");
              localStorage.setItem(
                "singledetails-B",
                JSON.stringify(response.data.beautdata)
              );
              dispatch(setBeautDetails(response.data.beautdata));
            } else {
              alert("NOT SET");
            }
          });
        });
      })
      .catch(() => {
        console.log("Error");
      });
  };

  return (
    <div>
      <div className="hero">
        PROFILE
      </div>
      <hr />

      <div className="profile-outer">
        <div className="profile-box">
          <div className="top">
            {/* <div className="col-md-8 headingg">
              SCHEDULES

            </div> */}
            <div className="col-md-4 datee">
           

            </div>
            
          </div>
          <hr />
          <div className="sch-content">

          <div style={{}}>
          <Typography
            variant="h6"
            component="h1"
            sx={{ marginBottom: "1.9rem" }}
          >
            EDIT DETAILS
          </Typography>
          <div className="row ">
            <Avatar
              src={statedatas.value.beautdetails.image}
              sx={{ width: 125, height: 125 }}
            />
          </div>
          <Button
        type="file"
        onClick={addImageHandler}
        variant="contained"
        startIcon={<InsertPhotoIcon />}
        sx={{ marginTop: "10px",backgroundColor:"inherit",color:"black",'&:hover': {
          backgroundColor: '#212529',color:"#D0D4D9" // Specify the desired background color on hover
        } }}
        size="small"
      >
        Change
      </Button>
      {console.log(statedatas.value.beautdetails.image)}
      <div>
        {addImage && (
          <>
            <input
              className="selectimage"
              accept="image/*"
              id="upload-button"
              type="file"
              onChange={handleFileChange}
            />
            <div>
              <Button
                type="file"
                onClick={uploadImageHandler}
                variant="contained"
                startIcon={<DriveFolderUploadIcon />}
                sx={{ marginTop: "10px"  }}
                size="small"
              >
                Upload
              </Button>
            </div>
          </>
        )}
      </div>
          <div className="row  mt-3 ">
            <Typography variant="h6" component="h1">
              {" "}
              Name :{" "}
            </Typography>
            <Typography variant="h6" component="h1">
              {" "}
              {statedatas.value.beautdetails.name}{" "}
            </Typography>
          </div>
          <div className="row  mt-3">
            <Typography variant="h6" component="h1">
              {" "}
              Email :{" "}
            </Typography>
            <Typography variant="h6" component="h1">
              {" "}
              {statedatas.value.beautdetails.email}{" "}
            </Typography>
          </div>

          <div className="row  mt-3">
            <Typography variant="h6" component="h1">
              {" "}
              Phone :{" "}
            </Typography>
            <Typography variant="h6" component="h1">
              {" "}
              {statedatas.value.beautdetails.phone}{" "}
            </Typography>
          </div>
          <Editdetailsmodal />
        </div>
         


          </div>
          

        </div>

      </div>

      

      

      {/* <Paper
        elevation={24}
        sx={{
          width: 850,

          height: 850,
          backgroundColor: "inherit",
          // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          marginTop: "30px",
          marginBottom: "30%",
          opacity: [0.9, 0.8, 0.8],

          "&:hover": {
            backgroundColor: "whitesmoke",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div style={{ marginLeft: "320px", paddingTop: "20px" }}>
          <Typography
            variant="h6"
            component="h1"
            sx={{ marginBottom: "1.9rem" }}
          >
            EDIT DETAILS
          </Typography>
          <div className="row ">
            <Avatar
              src={statedatas.value.beautdetails.image}
              sx={{ width: 125, height: 125 }}
            />
          </div>
          <Button
        type="file"
        onClick={addImageHandler}
        variant="contained"
        startIcon={<InsertPhotoIcon />}
        sx={{ marginTop: "10px" }}
        size="small"
      >
        Change
      </Button>
      {console.log(statedatas.value.beautdetails.image)}
      <div>
        {addImage && (
          <>
            <input
              className="selectimage"
              accept="image/*"
              id="upload-button"
              type="file"
              onChange={handleFileChange}
            />
            <div>
              <Button
                type="file"
                onClick={uploadImageHandler}
                variant="contained"
                startIcon={<DriveFolderUploadIcon />}
                sx={{ marginTop: "10px" }}
                size="small"
              >
                Upload
              </Button>
            </div>
          </>
        )}
      </div>
          <div className="row  mt-3 ">
            <Typography variant="h6" component="h1">
              {" "}
              Name :{" "}
            </Typography>
            <Typography variant="h6" component="h1">
              {" "}
              {statedatas.value.beautdetails.name}{" "}
            </Typography>
          </div>
          <div className="row  mt-3">
            <Typography variant="h6" component="h1">
              {" "}
              Email :{" "}
            </Typography>
            <Typography variant="h6" component="h1">
              {" "}
              {statedatas.value.beautdetails.email}{" "}
            </Typography>
          </div>

          <div className="row  mt-3">
            <Typography variant="h6" component="h1">
              {" "}
              Phone :{" "}
            </Typography>
            <Typography variant="h6" component="h1">
              {" "}
              {statedatas.value.beautdetails.phone}{" "}
            </Typography>
          </div>
          <Editdetailsmodal />
        </div>
      </Paper> */}
    </div>
  );
};

export default Profile;
