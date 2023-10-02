import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../axios/axiosconfig";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Viewmore from "./Viewmore";
import { toggleBooknow } from "../../../../feautures/customer/customernavigationslice";



const Servicepreview = () => {
  const servicepreview = useSelector((state) => state.servicepreview);
  const [singleService, setSingleService] = useState("");
  const [serviceBeauts, setServiceBeauts] = useState([]);
  const dispatch=useDispatch()

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
    localStorage.setItem("id",id)
  };

  return (
    <>
      <div className="row">
        <Container
          sx={{
            width: 900,
            height: 900,
            // backgroundColor: "#F5FFFA",
            // "&:hover": {
            //   backgroundColor: "#F5FFFA",
            //   opacity: [0.9, 0.8, 0.7],
            // },
          }}
        >
          <h1 className="expertin">{singleService.name}</h1>
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 150,
              height: 150,
              marginLeft: "50%",
            }}
            alt="Remy Sharp"
            src={singleService.image}
          />
          <div className="row mt-5">
            {serviceBeauts.map((item) => {
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
                      <div className="row  expert">
                        Expert
                        <AutoAwesomeIcon />
                      </div>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
          </div>

          <Viewmore />
        </Container>
      </div>
    </>
  );
};

export default Servicepreview;
