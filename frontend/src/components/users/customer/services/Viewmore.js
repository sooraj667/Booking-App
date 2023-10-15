import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../axios/axiosconfig";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarHalfIcon from "@mui/icons-material/StarHalf";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useSelector,useDispatch } from "react-redux";
import {toggleBooknow} from "../../../../feautures/customer/customernavigationslice"

import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";


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
    <div className="viewmorediv">
    {/* <Button  onClick={handleViewMore}
    sx={{ marginTop: "10px",backgroundColor:"inherit",color:"black",'&:hover': {
      backgroundColor: '#212529',color:"#D0D4D9" // Specify the desired background color on hover
    } }}>
        View More
        <KeyboardArrowDownIcon/>
      </Button> */}

    </div>


    {
            viewMoreServiceBeauts.map((item) => {
              return (
                <Stack spacing={3} className="mt-3">
                  <Paper
                    key={item.id} // Add a unique key for each item
                    elevation={24}
                    className="card"
                    sx={{
                      width: 400,
                      height: 220,
                      backgroundColor: "inherit",
                      // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
                      objectFit: "cover",
                      backgroundRepeat: "no-repeat",
                      // marginLeft: "20%",
                      marginTop: "30px",
                      marginBottom: "30%",
                      opacity: [0.3, 0.9, 0.9],
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "grey",
                        opacity: [0.3, 1, 1],
                        color: "white",
                      },
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={3}>
                        <Avatar
                          sx={{
                            width: 125,
                            height: 125,
                            marginLeft: "30px",
                            marginTop: "30px",
                          }}
                          src={item.beautician.image}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          className="textclass"
                          variant="h5"
                          component="h1"
                          sx={{
                            fontSize: "24px", // Adjust the font size as needed
                            fontWeight: "bold", // Make the text bold if desired
                            marginLeft: "55px",
                            marginTop: "45px",
                            whiteSpace: "nowrap", // Prevent text from wrapping to multiple lines
                            // overflow: "hidden", // Hide any overflow text
                            // textOverflow: "ellipsis",
                            // marginBottom: "16px", // Add some spacing at the bottom
                            // You can add more styles as needed, such as fontFamily, letterSpacing, etc.
                          }}
                        >
                          {item.beautician.name}
                          <br />
                          Rs {item.servicefee}/-
                          <br />
                          <StarIcon />
                          <hr />
                          <Button
                            variant="contained"
                            sx={{
                              marginLeft: "20px",
                              marginTop: "1px",
                              backgroundColor: "inherit",
                              color: "black",
                              "&:hover": {
                                backgroundColor: "grey",
                                opacity: [0.3, 1, 1],
                                color: "white",
                              },
                            }}
                            onClick={() => booknowHandler(item.beautician.id)}
                          >
                            Book Now
                          </Button>
                        </Typography>
                      </Grid>

                      {/* <Grid item xs={4}>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: "80px",
                        }}
                        onClick={() => booknowHandler(item.id)}
                      >
                        Book Now
                      </Button>
                    </Grid> */}
                    </Grid>
                  </Paper>
                </Stack>
              );
            })}





  
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
