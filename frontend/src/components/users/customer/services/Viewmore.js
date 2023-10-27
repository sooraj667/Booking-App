import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../axios/axiosconfig";


import CardActions from "@mui/material/CardActions";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import StarHalfIcon from "@mui/icons-material/StarHalf";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useSelector,useDispatch } from "react-redux";
import {toggleBooknow} from "../../../../feautures/customer/customernavigationslice"

import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover'; 
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from "@mui/icons-material/Star";

const Viewmore = () => {
  
  const servicepreview = useSelector((state) => state.servicepreview);
  const [viewMoreBool, setViewMoreBool] = useState(true);
  const [viewMoreServiceBeauts, setViewMoreServiceBeauts] = useState([]);
  const dispatch=useDispatch()



  const handleViewMore = () => {
    setViewMoreBool(!viewMoreBool);
    // if (viewMoreBool === true) {
    //   const datas = {
    //     serviceid: servicepreview.value.serviceid,
    //   };
    //   axiosInstance
    //     .post("cust/getviewmoreservicebeauts/", datas)
    //     .then((response) => {
    //       setViewMoreServiceBeauts(response.data.services);
    //     })
    //     .catch((error) => {
    //       alert(error);
    //     });
    // }
  };

  useEffect(
    ()=>{
        const datas = {
            serviceid: servicepreview.value.serviceid,
          };
          axiosInstance
            .post("cust/getviewmoreservicebeauts/", datas)
            .then((response) => {
              setViewMoreServiceBeauts(response.data.services);
            })
            .catch((error) => {
              alert(error);
            });
        

    },[]
  )

  const booknowHandler = (id) => {
    dispatch(toggleBooknow(id));
    localStorage.setItem("id",id)
  };

  return (
    <>
    <div className="">
    {/* <Button  onClick={handleViewMore}
    sx={{ marginTop: "10px",backgroundColor:"inherit",color:"black",'&:hover': {
      backgroundColor: '#212529',color:"#D0D4D9" // Specify the desired background color on hover
    } }}>
        View More
        <KeyboardArrowDownIcon/>
      </Button> */}

    </div>
    <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
        INTERMEDIATES
      
      </div>
<div className="row">

{
            viewMoreServiceBeauts.map((item) => {
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
                      {item.beautician.name}  <StarIcon />
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
                //           <StarIcon />
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

    





  
      {/* {viewMoreBool && (
        <div className="row mt-4">
          {viewMoreServiceBeauts.map((item) => {
            return (
              <div className="col-md-4">
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 240 }}
                    image={item.beautician.image}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.beautician.name}
                    </Typography>
                    <div className="row ml-1">
                      <Typography gutterBottom component="div" variant="h6">
                        Fee :
                      </Typography>
                      <Typography gutterBottom component="div" variant="h5">
                        {item.servicefee}/-
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => booknowHandler(item.beautician.id)}>Book Now</Button>
                    <div className="row  intermediate">
                      Intermediate
                      <StarHalfIcon />
                    </div>
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </div>
      )} */}
    </>
  );
};

export default Viewmore;
