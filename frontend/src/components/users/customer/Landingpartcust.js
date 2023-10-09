import React, { useState, useEffect } from "react";
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
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Container from "@mui/material/Container";
import ListSubheader from "@mui/material/ListSubheader";
import InfoIcon from "@mui/icons-material/Info";
import { setServiceId } from "../../../feautures/customer/servicepreviewslice";
import { toggleServicePreview } from "../../../feautures/customer/customernavigationslice";


import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarHalfIcon from "@mui/icons-material/StarHalf";




// function srcset(image, width, height, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${width * cols}&h=${
//       height * rows
//     }&fit=crop&auto=format&dpr=2 2x`,
//   };
// }

const Landingpartcust = () => {
  const [allServices, setAllServices] = useState([]);
  const [addImage, setAddImage] = useState(false);

  const [todayAppointments, setTodayAppointments] = useState([]);
  const statedatas = useSelector((state) => state.login);
  const dispatch = useDispatch();

  // const addImageHandler = () => {
  //   setAddImage((addImage) => !addImage);

  //   // console.log(datas.value.beautdetails.id);
  // };
  useEffect(() => {
    axiosInstance
      .get("cust/getallservices/")
      .then((response) => {
        console.log(response.data.allservices);
        setAllServices(response.data.allservices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleServiceClick = (id) => {
    dispatch(setServiceId(id));
    dispatch(toggleServicePreview());
  };

  // const handleFileChange = (e) => {
  //   setSelectedImage(e.target.files[0]);
  //   // console.log(URL.createObjectURL(e.target.files[0]));
  //   // return setSelectedImage(URL.createObjectURL(e.target.files[0]));
  // };

  useEffect(() => {
    const custdetails = JSON.parse(localStorage.getItem("singledetails-C"));

    const datas = {
      custid: custdetails.id,
    };
    axiosInstance
      .post("cust/getlandingpage/", datas)
      .then((res) => {
        setTodayAppointments(res.data.todays_appointmentdata);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  // const uploadImageHandler = () => {
  //   const reference = ref(storage, `customer/${selectedImage.name + v4()}`);
  //   uploadBytes(reference, selectedImage)
  //     .then((res) => {
  //       getDownloadURL(reference).then((url) => {
  //         console.log(url, "PRINTED");
  //         const datas = {
  //           imageurl: url,
  //           id: statedatas.value.custdetails.id,
  //         };
  //         axiosInstance.post("cust/changeimage/", datas).then((response) => {
  //           console.log(response.data);
  //           if (response.data.message == "Added") {
  //             console.log("ALL SET");
  //             localStorage.setItem(
  //               "singledetails-C",
  //               JSON.stringify(response.data.custdata)
  //             );
  //             dispatch(setCustDetails(response.data.custdata));
  //           } else {
  //             alert("NOT SET");
  //           }
  //         });
  //       });
  //     })
  //     .catch(() => {
  //       console.log("Error");
  //     });
  // };


  useEffect(() => {
    const custDetails = localStorage.getItem("singledetails-C");
    //const allBeauticians = localStorage.getItem("allbeauticians-C");

    if (custDetails) {
      const custdetails_parsed=JSON.parse(custDetails)
      dispatch(setCustDetails(custdetails_parsed));
    }
    // if (allBeauticians) {
    //   const allbeaut_parsed=JSON.parse(allBeauticians)
    //   dispatch(setAllBeauticiansC(allbeaut_parsed));
    // }
  },[]);
  return (
    <div>
      <Topstackcust />

      {/* <Button
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
      </div> */}
      <div>
        <Container
          elevation={24}
          sx={{
            width: 800,
            height:"100vh",
            // backgroundColor: "#F5FFFA",
            // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            marginLeft: "10%",
            marginTop: "30px",
            marginBottom: "30%",
            opacity: [0.9, 0.8, 0.8],

            // "&:hover": {
            //   backgroundColor: "whitesmoke",
            //   opacity: [0.9, 0.8, 0.7],
            // },
          }}
        >
          <div className="row">
            <div className="heading1">Services</div>
          </div>
          <div className="row">
            {allServices.map((item) => {
              return (
                <div className="col-md-4">
                  <Card sx={{ maxWidth: 345 ,height:395,marginTop:7 }}>
                    <CardMedia
                      sx={{ height: 240 }}
                      image={item.image}
                      title="green iguana"
                      onClick={()=>handleServiceClick(item.id)}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <div className="row ml-1">
                        {/* <Typography gutterBottom component="div" variant="h6">
                          Fee :
                        </Typography>
                        <Typography gutterBottom component="div" variant="h5">
                          {item.servicefee}/-
                        </Typography> */}
                      </div>
                      <Button size="small" onClick={()=>handleServiceClick(item.id)}>Check Beauticians</Button>
                    </CardContent>
                    <CardActions>
                      {/* <Button size="small" onClick={()=>handleServiceClick(item.id)}>Check Beauticians</Button> */}
                      
                    </CardActions>
                  </Card>
                  
                </div>
              );
            })}
     

          </div>

          {/* <ImageList sx={{ width: 700, height: 450 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">December</ListSubheader>
            </ImageListItem> */}

            {/* {allServices.map((item) => (
        <ImageListItem key={item.image}>
          <img
            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.image}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            onClick={()=>handleServiceClick(item.id)}
          />
          
          <ImageListItemBar
            title={item.name}
            subtitle={item.description}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))} */}
          {/* </ImageList> */}

          {/* <Typography
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
          } */}
        </Container>
      </div>
    </div>
  );
};

export default Landingpartcust;
