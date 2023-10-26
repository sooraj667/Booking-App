import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../axios/axiosconfig";

import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const Review = () => {
  const reqdatas = useSelector((state) => state.custreqdata);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const datas = {
      beautid: localStorage.getItem("id"),
    };
    console.log(datas, "FRESH");

    axiosInstance
      .post("cust/getreviews/", datas)
      .then((res) => {
        if (res.data.message === "notempty") {
          console.log(res.data.reviews);
          setReviews(res.data.reviews);
        }
        if (res.data.message === "empty") {
          setReviews(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="review-outer">
        {reviews ? (
          reviews.map((item) => {
            return (
              <>
                <Card
                  variant="outlined"
                  sx={{
                    width: 320,
                    // to make the card resizable
                    overflow: "auto",
                    resize: "horizontal",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src={item.customer.image} size="lg" />
                    {/* <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                      <Avatar src="/static/images/avatar/2.jpg" />
                      <Avatar src="/static/images/avatar/3.jpg" />
                      <Avatar src="/static/images/avatar/4.jpg" />
                      <Avatar>+4K</Avatar>
                    </AvatarGroup> */}
                  </Box>
                  <CardContent>
                    <Typography level="title-lg">
                      {item.customer.name}
                    </Typography>
                    <Typography level="body-sm">{item.content}</Typography>
                  </CardContent>
                  <CardActions buttonFlex="0 1 120px"></CardActions>
                </Card>

                {/* <div className="box">
                  <div className="row">
                    <div className="col-md-3">
                      <Avatar src={item.customer.image} />
                    </div>
                    <div className="col-md-9">{item.customer.name}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-9">{item.content}</div>
                  </div>
                </div> */}
              </>
            );
          })
        ) : (
          <h2>No reviews Yet!</h2>
        )}
      </div>
    </div>
  );
};

export default Review;
