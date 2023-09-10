import React from "react";
import Typography from "@mui/material/Typography";
import Topstack from "../Topstack";
import Grid from "@mui/system/Unstable_Grid";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setBeautDetails,
  setExpertIn,
  setServices,
} from "../../../../feautures/loginslice";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import WorkIcon from '@mui/icons-material/Work';

import Divider from '@mui/material/Divider';

const Services = () => {
  const statedatas = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    const beautDetails = localStorage.getItem("singledetails-B");
    const expertin = localStorage.getItem("expertin-B");
    const services = localStorage.getItem("services-B");
    if (beautDetails) {
      const parsed = JSON.parse(beautDetails);
      dispatch(setBeautDetails(parsed));
    }
    if (expertin) {
      const parsedexpert = JSON.parse(expertin);
      dispatch(setExpertIn(parsedexpert));
    }
    if (services) {
      const parsedservices = JSON.parse(services);
      dispatch(setServices(parsedservices));
    }
  }, []);
  return (
    <div>
      {console.log(statedatas.value.expertin.name)}
      <Topstack />
      <Typography
        variant="h3"
        component="h4"
        sx={{
          marginTop: "30px",
          marginLeft: "350px",
        }}
      >
        Services
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <Paper
            elevation={24}
            sx={{
              width: 350,
              height: 350,
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
            <Typography
              variant="h5"
              component="h1"
              sx={{ marginLeft: "30%", color: "#080000", paddingTop: "15px" }}
            >
              Efficient in
              </Typography>
              <Stack spacing={2} sx={{
                marginLeft:"80px",
                marginBottom:"20px"
              }}>
                <h2>{statedatas.value.expertin.name}</h2>
                </Stack>
                <Avatar
                  sx={{
                    width: 225,
                    height: 225,
                    borderRadius: "4px",
                    objectFit: "cover",
                    marginLeft:"60px"
                    
                  }}
                >
                  <img   src={statedatas.value.expertin.image} alt="" />
                </Avatar>
             
            
          </Paper>
        </Grid>
        <Grid xs={6}>
          <Paper
            elevation={24}
            sx={{
              width: 350,
              height: 350,
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
            <Typography
              variant="h5"
              component="h1"
              sx={{ marginLeft: "30%", color: "#080000", paddingTop: "15px" }}
            >
              Other Services
            </Typography>
            <Button variant="outlined">Add Service</Button>

            <Box sx={{ width: "100%" }}>
              <Stack spacing={2}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {statedatas.value.services.map((item) => {
                    return (
                      <>
                        <ListItem >
                          <ListItemAvatar>
                            <Avatar>
                              <WorkIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.name}
                            secondary="Jan 7, 2014"
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </>
                    );
                  })}
                </List>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Services;
