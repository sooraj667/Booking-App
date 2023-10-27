import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../axios/axiosconfig";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";

import CardActions from "@mui/material/CardActions";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Viewmore from "./Viewmore";
import { toggleBooknow } from "../../../../feautures/customer/customernavigationslice";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";


import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Servicepreview = () => {
  const servicepreview = useSelector((state) => state.servicepreview);
  const [singleService, setSingleService] = useState("");
  const [serviceBeauts, setServiceBeauts] = useState([]);
  const [alignment, setAlignment] = useState("web");
  const [experts, setExperts] = useState(true);
  const [intermediates, setIntermediates] = useState(true);
  const dispatch = useDispatch();

  const theme = useTheme();

  useEffect(() => {
    const datas = {
      serviceid: servicepreview.value.serviceid,
    };

    axiosInstance
      .post("cust/getsingleservice/", datas)
      .then((response) => {
        setSingleService(response.data.service);
      })
      .catch((error) => alert("ERROR"));
  }, []);

  useEffect(() => {
    const datas = {
      serviceid: servicepreview.value.serviceid,
    };

    axiosInstance
      .post("cust/getservicebeauts/", datas)
      .then((response) => {
        console.log(response.data.services, "NOKKADAAAAAAAAAAAA");
        setServiceBeauts(response.data.services);
      })
      .catch((error) => alert("2ND ERROR"));
  }, []);

  const booknowHandler = (id) => {
    dispatch(toggleBooknow(id));
    localStorage.setItem("id", id);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="prev-outer">
      <div className="hero">Service Details</div>
      <hr />
      <div className="expertin">
        <Avatar
          src={singleService.image}
          sx={{
            width: 135,
            height: 135,
          }}
        />
        {singleService.name}
        <div className="mt-3 mb-3">{singleService.description}</div>
        <div className="">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              value="web"
              onClick={() => {
                setExperts(true);
                setIntermediates(true);
              }}
            >
              All
            </ToggleButton>
            <ToggleButton
              value="android"
              onClick={() => {
                setExperts(true);
                setIntermediates(false);
              }}
            >
              Experts
            </ToggleButton>
            <ToggleButton
              value="ios"
              onClick={() => {
                setExperts(false);
                setIntermediates(true);
              }}
            >
              Intermediate
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <hr />
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
        EXPERTS
      
      </div>
      <div className="">
        {/* {
            experts && 
            <div className="intermediates-heading">
              EXPERTS

            </div>
          } */}
        <div
          // className="flex"
          // style={{
          //   display: "flex",
          //   flexDirection: "row" /* Display items in a row */,
          //   flexWrap: "wrap" /* Allow items to wrap to the next line */,
          //   justifyContent:
          //     "space-between" /* Distribute items evenly along the row */,
          //   gap: "2px",
          // }}
        >
              
          <div className="row">
          {experts &&
            serviceBeauts.map((item) => {
              return (
                  <div className="col-6">
                    <Card sx={{ minHeight: "280px", width: 320 }} onClick={() => booknowHandler(item.beautician.id)}>
                      <CardCover>
                        <img
                          src={item.beautician.image}
                          srcSet={item.beautician.image}
                          loading="lazy"
                          alt=""
                        />
                      </CardCover>
                      <CardCover
                        sx={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                        }}
                      />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Typography level="title-lg" textColor="#fff">
                        {item.beautician.name}  <StarIcon /> <StarIcon /> <StarIcon />
                        </Typography>
                        <Typography
                          startDecorator={<CurrencyRupeeIcon />}
                          textColor="neutral.300"
                        >
                          {item.servicefee}/-
                        
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>

                // <Stack spacing={3} className="mt-3">

                //   <Paper
                //     key={item.id} // Add a unique key for each item
                //     elevation={24}
                //     className="card"
                //     sx={{
                //       width: 400,
                //       height: 220,
                //       backgroundColor: "inherit",
                //       // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
                //       objectFit: "cover",
                //       backgroundRepeat: "no-repeat",
                //       // marginLeft: "20%",
                //       marginTop: "30px",
                //       marginBottom: "30%",
                //       opacity: [0.3, 0.9, 0.9],
                //       cursor: "pointer",
                //       "&:hover": {
                //         backgroundColor: "grey",
                //         opacity: [0.3, 1, 1],
                //         color: "white",
                //       },
                //     }}
                //   >
                //     <Grid container spacing={4}>
                //       <Grid item xs={3}>
                //         <Avatar
                //           sx={{
                //             width: 125,
                //             height: 125,
                //             marginLeft: "30px",
                //             marginTop: "30px",
                //           }}
                //           src={item.beautician.image}
                //         />
                //       </Grid>
                //       <Grid item xs={9}>
                //         <Typography
                //           className="textclass"
                //           variant="h5"
                //           component="h1"
                //           sx={{
                //             fontSize: "24px", // Adjust the font size as needed
                //             fontWeight: "bold", // Make the text bold if desired
                //             marginLeft: "55px",
                //             marginTop: "45px",
                //             whiteSpace: "nowrap", // Prevent text from wrapping to multiple lines
                //             // overflow: "hidden", // Hide any overflow text
                //             // textOverflow: "ellipsis",
                //             // marginBottom: "16px", // Add some spacing at the bottom
                //             // You can add more styles as needed, such as fontFamily, letterSpacing, etc.
                //           }}
                //         >
                //           {item.beautician.name}
                //           <br />
                //           Rs {item.servicefee}/-
                //           <br />
                //           <StarIcon /> <StarIcon /> <StarIcon />
                //           <hr />
                //           <Button
                //             variant="contained"
                //             sx={{
                //               marginLeft: "20px",
                //               marginTop: "1px",
                //               backgroundColor: "inherit",
                //               color: "black",
                //               "&:hover": {
                //                 backgroundColor: "grey",
                //                 opacity: [0.3, 1, 1],
                //                 color: "white",
                //               },
                //             }}
                //             onClick={() => booknowHandler(item.beautician.id)}
                //           >
                //             Book Now
                //           </Button>
                //         </Typography>
                //       </Grid>

                //       {/* <Grid item xs={4}>
                //       <Button
                //         variant="contained"
                //         sx={{
                //           marginTop: "80px",
                //         }}
                //         onClick={() => booknowHandler(item.id)}
                //       >
                //         Book Now
                //       </Button>
                //     </Grid> */}
                //     </Grid>
                //   </Paper>
                // </Stack>
              );
            })}

          </div>
          
        </div>

        {intermediates && (
          <>
            {/* <div className="intermediates-heading">INTERMEDIATES</div> */}

            <Viewmore />
          </>
        )}
      </div>
    </div>

    // <>
    // <div className="prev-outer">
    //   <div className="expertin">
    //   {singleService.name}

    //   </div>
    //   <div className="prev-content">
    //     <div className="part1">
    //     <Avatar
    //         sx={{
    //           bgcolor: deepOrange[500],
    //           width: 150,
    //           height: 150,

    //         }}
    //         alt="Remy Sharp"
    //         src={singleService.image}
    //       />

    //     </div>
    //     <hr />
    //     <div className="part2">
    //     {serviceBeauts.map((item) => {
    //           return (
    //             <div className="col-md-4">
    //               <Card sx={{ maxWidth: 345 }}>
    //                 <CardMedia
    //                   sx={{ height: 240 }}
    //                   image={item.beautician.image}
    //                   title="green iguana"
    //                 />
    //                 <CardContent>
    //                   <Typography gutterBottom variant="h5" component="div">
    //                     {item.beautician.name}
    //                   </Typography>
    //                   <div className="row ml-1">
    //                     <Typography gutterBottom component="div" variant="h6">
    //                       Fee :
    //                     </Typography>
    //                     <Typography gutterBottom component="div" variant="h5">
    //                       {item.servicefee}/-
    //                     </Typography>
    //                   </div>
    //                 </CardContent>
    //                 <CardActions>
    //                   <Button size="small" onClick={() => booknowHandler(item.beautician.id)}>Book Now</Button>
    //                   <div className="row  expert">
    //                     Expert
    //                     <AutoAwesomeIcon />
    //                   </div>
    //                 </CardActions>
    //               </Card>
    //             </div>
    //           );
    //         })}

    //     </div>

    //     <div className="part3">
    //     <Viewmore />
    //     </div>

    //   </div>

    // </div>

    //   <div className="row">
    //     <Container
    //       sx={{
    //         width: 900,
    //         height: 900,
    //         // backgroundColor: "#F5FFFA",
    //         // "&:hover": {
    //         //   backgroundColor: "#F5FFFA",
    //         //   opacity: [0.9, 0.8, 0.7],
    //         // },
    //       }}
    //     >

    //       <div className="row mt-5">

    //       </div>

    //     </Container>
    //   </div>
    // </>
  );
};

export default Servicepreview;
