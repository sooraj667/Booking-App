import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import Editdetailsmodal from "./Editdetailsmodal";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

import { storage } from "../../../../firebase/firebaseconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Topstack from "../Topstack";
import axiosInstance from "../../../../axios/axiosconfig";
import { setBeautDetails } from "../../../../feautures/loginslice";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import toast, { Toaster } from "react-hot-toast";
import AddBioModal from "./AddBioModal";

const Profile = () => {
  const statedatas = useSelector((state) => state.login);
  const [addImage, setAddImage] = useState(false);
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();

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
    const toastId = toast.loading('Uploading Image... Please Wait');
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
              toast.dismiss(toastId);
              setTimeout(()=>{
                toast.success("Profile Image Changed!")
      
              },200)
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
      <Toaster />
      <div className="hero">PROFILE</div>
      <hr />

      <div className="profile-outer">
        <div className="profile-box">
          <div className="top">
            <div className="col-md-4 datee"></div>
          </div>
          <hr />

          <div className="flex">
            <section className="aboutHome">
              <div className="container flexSB">
                <div className="right row">
                  <div className="items">
                    <>
                      <div className="item flexSB">
                        <div className="img">
                          <img
                            src={statedatas.value.beautdetails.image}
                            alt=""
                          />
                          <Button
                            type="file"
                            onClick={addImageHandler}
                            variant="contained"
                            startIcon={<InsertPhotoIcon />}
                            sx={{
                              marginTop: "10px",
                              backgroundColor: "inherit",
                              color: "black",
                              "&:hover": {
                                backgroundColor: "#212529",
                                color: "#D0D4D9",
                              },
                            }}
                            size="small"
                          >
                            Change
                          </Button>

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
                          <div className="text mt-3">
                            <h2>{statedatas.value.beautdetails.name}</h2>
                            <hr />
                            <p></p>
                          </div>
                        </div>
                        <div className="text">
                          <p>
                            <EmailIcon /> {statedatas.value.beautdetails.email}{" "}
                            <br />
                            <LocalPhoneIcon />{" "}
                            {statedatas.value.beautdetails.phone}
                          </p>
                          <Editdetailsmodal />
                          {
                            (statedatas.value.beautdetails.bio===" ") ?
                            <AddBioModal id={statedatas.value.beautdetails.id}/> :
                            <h2>HEY</h2>
                      
                           
                           
                            

                          }
                          {console.log(statedatas.value.beautdetails ,"FRESH SCN")}
                          
                          <hr />
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
