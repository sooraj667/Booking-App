import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../axios/axiosconfig";

import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
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
            setReviews(false)
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>

      <div className="review-outer">
        { reviews ? reviews.map((item) => {
          return (
            <>
              <div className="box">
                <div className="row">
                  <div className="col-md-3">
                    <Avatar src={item.customer.image} />
                  </div>
                  <div className="col-md-9">{item.customer.name}</div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-3">

                    </div>
                    <div className="col-md-9">
                    {item.content}

                    </div>
                    
                    </div>
              </div>
            </>
          );
        }) : <h2>No reviews Yet!</h2>}
      </div>
    </div>
  );
};

export default Review;
