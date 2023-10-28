import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../axios/axiosconfig";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import WorkShopBookingFullScreenDialog from "../workshops/WorkShopBookingFullScreenDialog";
const TopWorkshop = () => {
  const [top, setTop] = useState("");
  const [allWorkShops, setAllWorkShops] = useState([]);
  const [noWS, setNoWS] = useState(false);
  useEffect(() => {
    axiosInstance.get("cust/getallworkshops/").then((res) => {
      if (res.data.message === "no-workshops") {
        setNoWS(true);
      } else {
        setNoWS(false);
        setAllWorkShops(res.data.allworkshops);
      }
    });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("cust/gettopworkshop/")
      .then((response) => {
        if (response.data.message === "success") {
          setTop(response.data.topworkshop);
          console.log(response.data.topworkshop, "EDA SUGUNA");
        }
      })
      .catch((error) => {
        alert("ERROR");
      });
  }, []);
  return (
    <Card
      variant="solid"
      color=""
      invertedColors
      sx={{
        boxShadow: "lg",
        width: 600,
        maxWidth: "100%",
        // to make the demo resizeable
        overflow: "auto",
        resize: "horizontal",
        backgroundColor: "#",
        border:"1px solid"
      }}
    >
      <Box sx={{ display: "flex", justifyContent:"center" , gap: 1 }}>
        <Chip size="sm" variant="soft">
          {top.conducting_date}
        </Chip>
        <Chip size="sm" variant="soft">
          {top.start_time} {top.end_time}
        </Chip>
        
      </Box>
      <div className="flex justify-center">
      <ImageListItem sx={{ width: 200 }}>
        <img
          srcSet={top.beautician && top.beautician.image }
          src={top.beautician && top.beautician.image}
        //   loading="lazy"
        />
      </ImageListItem>

      </div>
      <div className="flex justify-center">
      <span className="">
        <i>Seats Filling Fast!</i>{" "}
      </span>

      </div>
      <div className="flex justify-center">
      <span className="text-danger">
        <i>Deadline - {top.registration_deadline}</i>{" "}
      </span>
        
        </div>
        <div className="flex justify-center">
        <div>
        <Typography level="h2">
          Rs.{top.price}
          <Typography fontSize="sm" textColor="text.tertiary">
            /-
          </Typography>
        </Typography>
      </div>
        
        </div>
 
   
     
      
   
      <CardContent>
        <Typography level="title-lg"><span className="text-info">{top.subject}</span> By {top.beautician?.name}</Typography>
        <Typography level="body-md">{top.description}</Typography>
      </CardContent>
      <div className="flex justify-center mt-2">
            <i> {top.customers?.length} people already booked for this workshop</i>
       
        </div>
    
        {top.id && (
          <div className="flex justify-center mt-3">
            <WorkShopBookingFullScreenDialog
              id={top.id}
              allWorkShops={allWorkShops}
            />

     
          </div>
        )}
      
     
   
    </Card>
  );
};

export default TopWorkshop;
