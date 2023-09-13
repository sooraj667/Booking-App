import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { setAllBeauticiansC } from "../../../feautures/loginslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import axiosInstance from "../../../axios/axiosconfig";
import "./Browse.css";
import {toggleBooknow} from "../../../feautures/customer/customernavigationslice"
const Browse = () => {
  const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);
  const navigationdatas = useSelector((state) => state.custnavigation);

  const booknowHandler=(id)=>{
    dispatch((toggleBooknow(id)))
    // const datas={
    //     beautid:id,
    //     custid:statedatas.value.custdetails.id
    // }
    // axiosInstance.post("cust/booknow",datas).then((res)=>{
    //     console.log(res.data);
    // }).catch((err)=>alert(err))

  }

  useEffect(() => {
    const allBeauticians = localStorage.getItem("allbeauticians-C");

    if (allBeauticians) {
      const allbeaut_parsed = JSON.parse(allBeauticians);
      dispatch(setAllBeauticiansC(allbeaut_parsed));
    }
  }, []);
  return (
    <div>
      <Typography variant="h2" component="h3">
        Browse
      </Typography>
      <Box sx={{ width: "100%" }}>
        {statedatas.value.allbeauticians.map((item) => {
          return (
            <Stack spacing={3} >
              <Paper
                elevation={24}
                sx={{
                  width: 900,
                  height: 190,
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
                <Grid container spacing={2}>
                  <Grid item xs={2.2}>
                    <Avatar
                      sx={{
                        width: 125,
                        height: 125,
                        marginLeft: "30px",
                        marginTop: "10px",
                      }}
                      src={item.image}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    
                    <Typography variant="h5" component="h1" sx={{}}>
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                  <Typography variant="h5" component="h1" sx={{}}>
                      Expert in
                    </Typography>
                  <h2>{item.expertin.name}</h2>
                 
                  </Grid>
                  <Grid item xs={3} >
                    <Button variant="contained" sx={{
                        marginTop:"80px"
                    }} onClick={()=>booknowHandler(item.id)}>Book Now</Button>
                  
                 
                  </Grid>
                </Grid>

              
              </Paper>
            </Stack>
          );
        })}
      </Box>
    </div>
  );
};

export default Browse;
