import React, { useState,useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Input, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import axiosInstance from "../../../axios/axiosconfig";
import { storage } from "../../../firebase/firebaseconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { setCustDetails } from "../../../feautures/loginslice";
import Paper from "@mui/material/Paper";
import Topstackcust from "./Topstackcust";


const Landingpartcust = () => {
  const [addImage, setAddImage] = useState(false);
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [todayAppointments, setTodayAppointments] = useState([]);
  const statedatas = useSelector((state) => state.login);
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

  useEffect(
    ()=>{
      const custdetails = JSON.parse(localStorage.getItem("singledetails-C"));
      console.log(custdetails, "################3");

      const datas={
        custid:custdetails.id
      }
        axiosInstance.post("cust/getlandingpage/",datas).then((res)=>{
            console.log(res.data,"**************");
            setTodayAppointments(res.data.todays_appointmentdata)

        }).catch((err)=>{
            alert(err)
        })
    },[]
  )

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
      <Topstackcust />

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
      <div>
        <Paper
          elevation={24}
          sx={{
            width: 500,
            height: 410,
            backgroundColor: "#F5FFFA",
            // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            marginLeft: "20%",
            marginTop: "30px",
            marginBottom: "30%",
            opacity: [0.9, 0.8, 0.8],

            "&:hover": {
              backgroundColor: "whitesmoke",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{ marginLeft: "20%", color: "#080000", paddingTop: "15px" }}
          >
            Appointments For Today
          </Typography>
          {
            todayAppointments.map(
              (item)=>{
                return(
                  <Stack
                  spacing={2}
                  className="stackdiv"
                  
                  sx={{
                    borderBottom: "1px solid #ddd",
                    marginBottom: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  <div className="row">
                    <div className="col-md-8">
                      <div className="titles" style={{ fontWeight: "bold" }}>
                        Date:
                      </div>
                      <div className="values">{item.date}</div>
      
                      <div className="titles" style={{ fontWeight: "bold" }}>
                        Time:
                      </div>
                      <div className="values">{item.time}</div>
      
                      <div className="titles" style={{ fontWeight: "bold" }}>
                        Studio Address:
                      </div>
                      <div className="values">
                        {`${item.studio.locality}, ${item.studio.place}, ${item.studio.district}, ${item.studio.state}`}
                      </div>
      
                      <div className="titles" style={{ fontWeight: "bold" }}>
                        Service:
                      </div>
                      <div className="values">{item.service.service.name}</div>
      
                      <div className="titles" style={{ fontWeight: "bold" }}>
                        Amount:
                      </div>
                      <div className="values">{item.service.servicefee}</div>
                    </div>
                    <div className="col-md-4">
                      <Avatar
                        alt={item.beautician.name}
                        src={item.beautician.image}
                        sx={{ width: 120, height: 120, borderRadius: "50%" }}
                      />
                      <div className="titles" style={{ fontWeight: "bold" }}>
                        Appointment with:
                      </div>
                      <div className="values">{item.beautician.name}</div>
                    </div>
                  </div>
                </Stack>
                )
              }
            )
          }
        </Paper>
      </div>
    </div>
  );
};

export default Landingpartcust;
