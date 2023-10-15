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
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axiosInstance from "../../../axios/axiosconfig";
import "./Contents.css";

import { toggleBooknow } from "../../../feautures/customer/customernavigationslice";
const Browse = () => {
  const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);
  const navigationdatas = useSelector((state) => state.custnavigation);

  const booknowHandler = (id) => {
    dispatch(toggleBooknow(id));
    localStorage.setItem("id", id);
    // const datas={
    //     beautid:id,
    //     custid:statedatas.value.custdetails.id
    // }
    // axiosInstance.post("cust/booknow",datas).then((res)=>{
    //     console.log(res.data);
    // }).catch((err)=>alert(err))
  };

  useEffect(() => {
    const allBeauticians = localStorage.getItem("allbeauticians-C");

    if (allBeauticians) {
      const allbeaut_parsed = JSON.parse(allBeauticians);
      dispatch(setAllBeauticiansC(allbeaut_parsed));
    }
  }, []);
  return (
    <div className="browse-outer">
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
        {statedatas.value.allbeauticians.map((item) => {
          return (
            <Stack spacing={3} className="mt-3">
              <Paper
                key={item.id} // Add a unique key for each item
                elevation={24}
                className="card"
                sx={{
                  width: 400,
                  height: 190,
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
                      src={item.image}
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
                      {item.name}
                      <br />
                      <Button
                        variant="contained"
                        sx={{
                          marginLeft: "20px",
                          marginTop: "10px",
                          backgroundColor: "inherit",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "grey",
                            opacity: [0.3, 1, 1],
                            color: "white",
                          },
                        }}
                        onClick={() => booknowHandler(item.id)}
                      >
                        VIEW MORE
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
