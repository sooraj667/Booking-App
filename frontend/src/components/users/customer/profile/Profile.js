import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import  Typography  from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
// import "./Profile.css"
import Editdetailsmodal from "./Editdetailsmodal";
import Topstackcust from "../Topstackcust";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { storage } from "../../../../firebase/firebaseconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import { setCustDetails } from "../../../../feautures/loginslice";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../axios/axiosconfig";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const Profile = () => {
  const statedatas = useSelector((state) => state.login);
  const [addImage, setAddImage] = useState(false);
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);

  };

  const addImageHandler = () => {
    setAddImage((addImage) => !addImage);

    // console.log(datas.value.beautdetails.id);
  };
  const uploadImageHandler = () => {
    const reference = ref(storage, `customer/${selectedImage.name + v4()}`);
    uploadBytes(reference, selectedImage)
      .then((res) => {
        getDownloadURL(reference).then((url) => {
          console.log(url, "PRINTED");
          const datas = {
            imageurl: url,
            id: statedatas.value.custdetails.id,
          };
          axiosInstance.post("cust/changeimage/", datas).then((response) => {
            console.log(response.data);
            if (response.data.message == "Added") {
              console.log("ALL SET");
              localStorage.setItem(
                "singledetails-C",
                JSON.stringify(response.data.custdata)
              );
              dispatch(setCustDetails(response.data.custdata));
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
                            src={statedatas.value.custdetails.image}
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
                            <h2>{statedatas.value.custdetails.name}</h2>
                            <hr />
                            <p></p>
                          </div>
                        </div>
                        <div className="text">
                          <p>
                            <EmailIcon /> {statedatas.value.custdetails.email}{" "}
                            <br />
                            <LocalPhoneIcon />{" "}
                            {statedatas.value.custdetails.phone}
                          </p>
                          <Editdetailsmodal />
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

















    // <div>
    //   <div className="hero">PROFILE</div>
    //   <hr />

    //   <div className="profile-outer">
    //     <div className="profile-box">
    //       <div className="top">
    //         {/* <div className="col-md-8 headingg">
    //           SCHEDULES

    //         </div> */}
    //         <div className="col-md-4 datee"></div>
    //       </div>
    //       <hr />
    //       <div className="sch-content">
    //         <div style={{}}>
    //           <Typography
    //             variant="h6"
    //             component="h1"
    //             sx={{ marginBottom: "1.9rem" }}
    //           >
    //             EDIT DETAILS
    //           </Typography>
    //           <div className="row ">
    //             <Avatar
    //               src={statedatas.value.custdetails.image}
    //               sx={{ width: 125, height: 125 }}
    //             />
    //           </div>
    //           <Button
    //             type="file"
    //             onClick={addImageHandler}
    //             variant="contained"
    //             startIcon={<InsertPhotoIcon />}
    //             sx={{
    //               marginTop: "10px",
    //               backgroundColor: "inherit",
    //               color: "black",
    //               "&:hover": {
    //                 backgroundColor: "#212529",
    //                 color: "#D0D4D9", // Specify the desired background color on hover
    //               },
    //             }}
    //             size="small"
    //           >
    //             Change
    //           </Button>
    //           {console.log(statedatas.value.beautdetails.image)}
    //           <div>
    //             {addImage && (
    //               <>
    //                 <input
    //                   className="selectimage"
    //                   accept="image/*"
    //                   id="upload-button"
    //                   type="file"
    //                   onChange={handleFileChange}
    //                 />
    //                 <div>
    //                   <Button
    //                     type="file"
    //                     onClick={uploadImageHandler}
    //                     variant="contained"
    //                     startIcon={<DriveFolderUploadIcon />}
    //                     sx={{ marginTop: "10px" }}
    //                     size="small"
    //                   >
    //                     Upload
    //                   </Button>
    //                 </div>
    //               </>
    //             )}
    //           </div>
    //           <div className="row  mt-3 ">
    //             <Typography variant="h6" component="h1">
    //               {" "}
    //               Name :{" "}
    //             </Typography>
    //             <Typography variant="h6" component="h1">
    //               {" "}
    //               {statedatas.value.custdetails.name}{" "}
    //             </Typography>
    //           </div>
    //           <div className="row  mt-3">
    //             <Typography variant="h6" component="h1">
    //               {" "}
    //               Email :{" "}
    //             </Typography>
    //             <Typography variant="h6" component="h1">
    //               {" "}
    //               {statedatas.value.custdetails.email}{" "}
    //             </Typography>
    //           </div>

    //           <div className="row  mt-3">
    //             <Typography variant="h6" component="h1">
    //               {" "}
    //               Phone :{" "}
    //             </Typography>
    //             <Typography variant="h6" component="h1">
    //               {" "}
    //               {statedatas.value.custdetails.phone}{" "}
    //             </Typography>
    //           </div>
    //           <Editdetailsmodal />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    
    
  )
}

export default Profile 








{/* <>
    <div className="row">
      <div className="heading1">
        Profile
      </div>
    </div>


        
    
    <Paper
        elevation={24}
        sx={{
          width: 850,

          height: 850,
          backgroundColor: "#F5FFFA",
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
         
        <div style={{"marginLeft":"320px","paddingTop":"120px"}}>
        <Avatar src={statedatas.value.custdetails.image}  sx={{ width: 125, height: 125 }}/>
        <Button
        type="file"
        onClick={addImageHandler}
        variant="contained"
        startIcon={<InsertPhotoIcon />}
        sx={{ marginTop: "10px" }}
        size="small"
      >
        Change Photo
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
            <div className="row ">

           


                
               

            </div>
            <div className="row  mt-3 ">
                <Typography variant="h6" component="h1"> Name : </Typography>
                <Typography variant="h6" component="h1"> {statedatas.value.custdetails.name} </Typography>

            </div>
            <div className="row  mt-3">
                <Typography variant="h6" component="h1"> Email : </Typography>
                <Typography variant="h6" component="h1"> {statedatas.value.custdetails.email} </Typography>

            </div>

            <div className="row  mt-3">
                <Typography variant="h6" component="h1"> Phone : </Typography>
                <Typography variant="h6" component="h1"> {statedatas.value.custdetails.phone} </Typography>

            </div>
            <Editdetailsmodal/>
            


            

       

        </div>
        
   
        
      </Paper>
      </> */}