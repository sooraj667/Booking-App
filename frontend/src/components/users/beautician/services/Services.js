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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import WorkIcon from "@mui/icons-material/Work";

import Divider from "@mui/material/Divider";
import Addservicemodal from "./Addservicemodal";
import "./Services.css";
import expertpng from "../../../../images/Beauty salon-rafiki.png";
import AddIcon from "@mui/icons-material/Add";
import AddToExpertiseModal from "./AddToExpertiseModal";

const Services = () => {
  const statedatas = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("SERVICES");
    const beautDetails = localStorage.getItem("singledetails-B");

    const services = localStorage.getItem("services-B");
    if (beautDetails) {
      const parsed = JSON.parse(beautDetails);
      dispatch(setBeautDetails(parsed));
    }

    if (services) {
      const parsedservices = JSON.parse(services);
      dispatch(setServices(parsedservices));
    }
  }, []);
  return (
    <div>
      <div className="hero">SERVICES</div>
      <hr />
      <div className="services-outer">
        <div className="services-box">
          <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
            EXPERTISE
          </div>
          <div className="flex justify-center">
            <Avatar src={expertpng} alt="" sx={{ width: 220, height: 220 }} />
          </div>

          <div className="flex justify-center align-center themecolor">
            {statedatas.value.services
              .filter((item) => {
                return item.topservice == true;
              })
              .map((val) => {
                return (
                  <>
                    <div className="">
                      <h1>{val.service.name}</h1>
                    </div>
                  </>
                );
              })}
          </div>

          <hr />
          <div className="services-body mb-4 ">
            <div className="services-heading">All Services</div>
            <List
              sx={{
                width: "100%",
                color: "#212529",
                

                bgcolor: "inherit",
              }}
            >
              {statedatas.value.services.map((item) => {
                return (
                  <>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Avatar src={item.service.image}></Avatar>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.service.name}
                        secondary={`Rs ${item.servicefee} /-`}
                      />
                      {/* <Avatar src={item.service.image}></Avatar> */}
                      {/* {item.service.name} */}
                      <AddToExpertiseModal id={item.id} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                );
              })}
            </List>
              <div className="pb-5"><Addservicemodal /></div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

// {console.log(statedatas.value.expertin.name)}
//       <Topstack />
//       <Typography
//         variant="h3"
//         component="h4"
//         sx={{
//           marginTop: "30px",
//           marginLeft: "350px",
//         }}
//       >
//         Services
//       </Typography>

//       <Grid container spacing={2}>
//         {/* <Grid xs={6}>
//           <Paper
//             elevation={24}
//             sx={{
//               width: 350,
//               height: 350,
//               backgroundColor: "#F5FFFA",
//               // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
//               objectFit: "cover",
//               backgroundRepeat: "no-repeat",

//               marginTop: "30px",
//               marginBottom: "30%",
//               opacity: [0.9, 0.8, 0.8],

//               "&:hover": {
//                 backgroundColor: "whitesmoke",
//                 opacity: [0.9, 0.8, 0.7],
//               },
//             }}
//           >
//             <Typography
//               variant="h5"
//               component="h1"
//               sx={{ marginLeft: "30%", color: "#080000", paddingTop: "15px" }}
//             >
//               Efficient in
//               </Typography>
//               <Stack spacing={2} sx={{
//                 marginLeft:"80px",
//                 marginBottom:"20px"
//               }}>
//                 <h2>{statedatas.value.expertin.name}</h2>
//                 </Stack>
//                 <Avatar
//                   sx={{
//                     width: 225,
//                     height: 225,
//                     borderRadius: "4px",
//                     objectFit: "cover",
//                     marginLeft:"60px"

//                   }}
//                 >
//                   <img   src={statedatas.value.expertin.image} alt="" />
//                 </Avatar>

//           </Paper>
//         </Grid> */}
//         <Grid xs={12}>
//           <Paper
//             elevation={24}
//             sx={{
//               width: 450,
//               height: 350,
//               backgroundColor: "#F5FFFA",
//               // backgroundImage:'url("https://img.freepik.com/premium-photo/close-up-hair-supplies-flat-lay_23-2148352942.jpg?w=900")',
//               objectFit: "cover",
//               backgroundRepeat: "no-repeat",

//               marginTop: "30px",
//               marginBottom: "30%",
//               marginLeft:"20%",
//               opacity: [0.9, 0.8, 0.8],

//               "&:hover": {
//                 backgroundColor: "whitesmoke",
//                 opacity: [0.9, 0.8, 0.7],
//               },
//             }}
//           >
//             <Typography
//               variant="h5"
//               component="h1"
//               sx={{ marginLeft: "30%", color: "#080000", paddingTop: "15px" }}
//             >
//               Your Services
//             </Typography>

//             <Box sx={{ width: "100%" }}>
//               <Stack spacing={2}>
//                 <List
//                   sx={{
//                     width: "100%",
//                     maxWidth: 900,
//                     bgcolor: "background.paper",
//                   }}
//                 >
//                   {statedatas.value.services.map((item) => {
//                     return (
//                       <>
//                         <ListItem >
//                           <ListItemAvatar>
//                             <Avatar>
//                               <WorkIcon />
//                             </Avatar>
//                           </ListItemAvatar>
//                           <ListItemText
//                             primary={item.service.name}
//                             secondary={`Rs ${item.servicefee} /-`}
//                           />
//                           <Avatar src={item.service.image}></Avatar>
//                           {/* {item.service.name} */}

//                         </ListItem>
//                         <Divider variant="inset" component="li" />
//                       </>
//                     );
//                   })}
//                 </List>
//               </Stack>
//             </Box>
//             <Addservicemodal/>
//           </Paper>
//         </Grid>
//       </Grid>
