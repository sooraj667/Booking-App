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
import "./Browse.css";
const Browse = () => {
  const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);

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
            <Stack spacing={3}>
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
                <div className="row">
                  <Avatar sx={{ width: 125, height: 125 ,marginLeft:"30px",marginTop:"10px"}} src={item.image} />
                  <Typography variant="h5" component="h1" sx={{}}>
                    {item.name}
                  </Typography>
                  
                  <h2 >
                    {item.expertin.name}
                  </h2>
             
                </div>
              </Paper>
            </Stack>
          );
        })}
      </Box>
    </div>
  );
};

export default Browse;
