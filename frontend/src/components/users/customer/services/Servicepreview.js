import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../axios/axiosconfig";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const Servicepreview = () => {
  const servicepreview = useSelector((state) => state.servicepreview);
  const [singleService, setSingleService] = useState("");
  const [serviceBeauts, setServiceBeauts] = useState([]);
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
  return (
    <>
      <div className="row">
        <Container
          sx={{
            width: 900,
            height: 900,
            backgroundColor: "#F5FFFA",
            "&:hover": {
              backgroundColor: "#F5FFFA",
              opacity: [0.9, 0.8, 0.7],
            },
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
          {serviceBeauts.map((item) => {
            return (
              <Card sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {item.beautician.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Mac Miller
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <IconButton aria-label="previous">
                      {theme.direction === "rtl" ? (
                        <SkipNextIcon />
                      ) : (
                        <SkipPreviousIcon />
                      )}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                      {theme.direction === "rtl" ? (
                        <SkipPreviousIcon />
                      ) : (
                        <SkipNextIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={item.beautician.image}
                  alt="Live from space album cover"
                />
              </Card>
            );
          })}
        </Container>
      </div>
    </>
  );
};

export default Servicepreview;
