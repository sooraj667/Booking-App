import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { setAllBeauticiansC } from "../../../feautures/loginslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import axiosInstance from "../../../axios/axiosconfig";
import "./Contents.css";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import toast, { Toaster } from "react-hot-toast";

import { toggleBooknow } from "../../../feautures/customer/customernavigationslice";
import AddToFavouritesModal from "./bookings/AddToFavouritesModal";
const Browse = () => {
  const [allServices,setAllServices]=useState([])
  const [allFavs,setAllFavs]=useState([])
  const [allRevs,setAllRevs]=useState([])
  const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);
  const navigationdatas = useSelector((state) => state.custnavigation);

  const booknowHandler = (id) => {
    dispatch(toggleBooknow(id));
    localStorage.setItem("id", id);
    localStorage.removeItem("studio")
    localStorage.removeItem("time")
    localStorage.removeItem("date")
    localStorage.removeItem("service")
    // const datas={
    //     beautid:id,
    //     custid:statedatas.value.custdetails.id
    // }
    // axiosInstance.post("cust/booknow",datas).then((res)=>{
    //     console.log(res.data);
    // }).catch((err)=>alert(err))
  };

  useEffect(() => {
    //const allBeauticians = localStorage.getItem("allbeauticians-C");

    axiosInstance
    .get("cust/getallbeauticians/").then((response)=>{
      dispatch(setAllBeauticiansC(response.data.allbeauticians));
      setAllFavs(response.data.allfavs)
      setAllRevs(response.data.allrevs)
  
    }).catch((error)=>{
      alert("ERROR")
    })

    // if (allBeauticians) {
    //   const allbeaut_parsed = JSON.parse(allBeauticians);
    //   dispatch(setAllBeauticiansC(allbeaut_parsed));
    // }

    axiosInstance
    .get("cust/getallservicefee/").then((response)=>{
      setAllServices(response.data.allservices)
  
    }).catch((error)=>{
      alert("ERROR")
    })

    
    


  }, []);
  return (
    <div className="browse-outer">
      <Toaster/>
      <div className="hero">EXPLORE</div>
      <hr />
      <div
        className="flex"
        style={{
          display: "flex",
          flexDirection: "row" /* Display items in a row */,
          flexWrap: "wrap" /* Allow items to wrap to the next line */,
          justifyContent:
            "space-between" /* Distribute items evenly along the row */,
          gap: "2px",
        }}
      >
      
       
            <Stack >

              {
                statedatas.value.allbeauticians.map((item)=>{
                  return(
                    <Box
                sx={{
                  width: "200%",
                  position: "relative",
                  overflow: { xs: "auto", sm: "initial" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    display: "block",
                    width: "1px",
                    bgcolor: "warning.300",
                    left: "500px",
                    top: "-24px",
                    bottom: "-24px",
                    "&::before": {
                      top: "4px",
                      content: '""',
                      display: "block",
                      position: "absolute",
                      right: "0.5rem",
                      color: "text.tertiary",
                      fontSize: "sm",
                      fontWeight: "lg",
                    },
                    "&::after": {
                      top: "4px",
                      content: '""',
                      display: "block",
                      position: "absolute",
                      left: "0.5rem",
                      color: "text.tertiary",
                      fontSize: "sm",
                      fontWeight: "lg",
                    },
                  }}
                />
                <Card
                  orientation="horizontal"
                  sx={{
                    width: "100%",
                    flexWrap: "wrap",
                    [`& > *`]: {
                      "--stack-point": "500px",
                      minWidth:
                        "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                    },
                    // make the card resizable for demo
                    overflow: "auto",
                    resize: "horizontal",
                  }}
                >
                  <AspectRatio
                    flex
                    ratio="1"
                    maxHeight={182}
                    sx={{ minWidth: 182 }}
                  >
                    <img
                      src={item.image}
                      srcSet={item.image}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <CardContent>
                    <Typography fontSize="xl" fontWeight="lg">
                    {item.name} 
                    </Typography>
                    <Typography
                      level="body-sm"
                      fontWeight="lg"
                      textColor="text.tertiary"
                    >

                       {
                        allServices.filter((seritem)=>{
                          return(seritem.beautician.id===item.id)
                        }).filter((val)=>{
                          return(
                            val.topservice===true
                          )
                        }).map((i)=>{

                          return(<div><span className="text-dark">Expert In</span> - <span className="text-info">{i.service.name}</span></div>)
                          
                        })
                        
                     
                      }
                      <hr />

                      <div className="title1 sgfont allservices">All Services</div>




                      {
                        allServices.filter((seritem)=>{
                          return(seritem.beautician.id===item.id)
                        }).map((val)=>{
                          return(
                            <div>{val.service.name}</div>
                          )
                        })
                        
                     
                      }






                     



                      

                      
                    </Typography>
                    {console.log(allServices,"SERVICES NOKKEDA IPPOLATHE ")}
                    <Sheet
                      sx={{
                        bgcolor: "background.level1",
                        borderRadius: "sm",
                        p: 1.5,
                        my: 1.5,
                        display: "flex",
                        gap: 2,
                        "& > div": { flex: 1 },
                      }}
                    >
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                         Likes
                        </Typography>
                        <Typography fontWeight="lg">{allFavs.filter((fav)=>{
                          return(fav.beautician.name===item.name)
                        }).length}</Typography>
                      </div>
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          Bookings
                        </Typography>
                        <Typography fontWeight="lg">{item.appointment_count}</Typography>
                      </div>
                      <div>
                        <Typography level="body-xs" fontWeight="lg">
                          Reviews
                        </Typography>
                        <Typography fontWeight="lg">{allRevs.filter((rev)=>{
                          return(rev.beautician.name===item.name)
                        }).length}</Typography>
                      </div>
                    </Sheet>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        "& > button": { flex: 1 },
                      }}
                    >
                      {/* <Button variant="outlined" color="neutral">
                        Chat
                      </Button> */}
                      <AddToFavouritesModal myid={item.id}/>
                      <Button variant="solid" color="primary" onClick={() => booknowHandler(item.id)}>
                        Book Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>

                  )
                })
              }
              

              {/* <Paper
                key={item.id}  
                elevation={24}
                className="card" 
            
                sx={{
                  width: 400,
                  height: 190,
                  backgroundColor: "inherit",

                  objectFit: "cover",
                  backgroundRepeat: "no-repeat",
        
                  marginTop: "30px",
                  marginBottom: "30%",
                  opacity: [0.3, 0.9, 0.9],
                  cursor:"pointer",
                  "&:hover": {
                    backgroundColor: "grey",
                    opacity:  [0.3, 1, 1],
                    color:"white"
                  },
            
                }}
              >
                <Grid container spacing={4} >
                  <Grid item xs={3}>
                    <Avatar
                      sx={{
                        width: 125,
                        height: 125,
                        marginLeft: "30px",
                        marginTop: "30px",
                      }}
                      src={item.image}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                    className="textclass"
                      variant="h5"
                      component="h1"
                      sx={{
                        fontSize: "24px",
                        fontWeight: "bold", 
                        marginLeft: "55px",
                        marginTop:"45px",
                        whiteSpace: "nowrap", 
                      
                      }}
                    >
                      {item.name}
                      <br/>
                      <Button
                      variant="contained"
                      sx={{
                        marginLeft:"20px",
                        marginTop: "10px",
                        backgroundColor: "inherit",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "grey",
                          opacity:  [0.3, 1, 1],
                          color:"white" },
                      }}
                      onClick={() => booknowHandler(item.id)}
                    >
                      VIEW MORE 
                    </Button> 
                      
                    </Typography>
                  </Grid>
                 
                 
                </Grid>
              </Paper> */}
            </Stack>
          );
   
      </div>
    </div>
  );
};

export default Browse;

{
  /* <div>
      <div className="row">
      <div className="heading1">
        Explore
      </div>

      </div>
   
      <Box sx={{ width: "100%" }}>
        {statedatas.value.allbeauticians.map((item) => {
          return (
            <Stack spacing={3} className="mt-3">
              <Paper
                elevation={24}
                sx={{
                  width: 700,
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
                <Grid container spacing={4} >
                  <Grid item xs={3}>
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
                  <Grid item xs={4}>
                    <Typography
                    className="textclass"
                      variant="h5"
                      component="h1"
                      sx={{
                        fontSize: "24px", // Adjust the font size as needed
                        fontWeight: "bold", // Make the text bold if desired
                        // Change the text color based on your color palette
                        marginBottom: "16px", // Add some spacing at the bottom
                        // You can add more styles as needed, such as fontFamily, letterSpacing, etc.
                      }}
                    >
                      {item.name}
                      <Button
                      variant="contained"
                      sx={{
                        marginTop: "80px",
                      }}
                      onClick={() => booknowHandler(item.id)}
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
                  </Grid> */
}
//           </Grid>
//         </Paper>
//       </Stack>
//     );
//   })}
// </Box>
// </div> */}
