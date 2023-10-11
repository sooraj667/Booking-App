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


const Viewmore = () => {
  
  const servicepreview = useSelector((state) => state.servicepreview);
  const [viewMoreBool, setViewMoreBool] = useState(false);
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
    <Button  onClick={handleViewMore}
    sx={{ marginTop: "10px",backgroundColor:"inherit",color:"black",'&:hover': {
      backgroundColor: '#212529',color:"#D0D4D9" // Specify the desired background color on hover
    } }}>
        View More
        <KeyboardArrowDownIcon/>
      </Button>

    </div>
  
      {viewMoreBool && (
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
      )}
    </>
  );
};

export default Viewmore;
