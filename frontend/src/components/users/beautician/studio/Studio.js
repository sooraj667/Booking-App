import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import axiosInstance from "../../../../axios/axiosconfig";
import { useDispatch, useSelector } from "react-redux";
import { setStudiodatas } from "../../../../feautures/beautician/studioformslice";
import Addstudiomodal from "./Addstudiomodal";
import "./Studio.css"
import Editstudiomodal from "./Editstudiomodal";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Studio = () => {
  const studiodatas = useSelector((state) => state.studioform);
  const dispatch = useDispatch();

  useEffect(() => {
    const beautdetails = localStorage.getItem("singledetails-B");
    const parsed = JSON.parse(beautdetails);

    const datas = {
      beautid: parsed.id,
    };
    console.log(datas, "********8");
    axiosInstance
      .post("beaut/getstudios/", datas)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("studios-B", JSON.stringify(res.data.studios));
        dispatch(setStudiodatas(res.data.studios));
      })
      .catch((err) => alert(err));
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-10">
          <h2>Your Studios</h2>
        </div>

        <div className="col-md-2 mt-2">
          <Addstudiomodal />
        </div>
      </div>
      <div className="row">
        <Stack spacing={2}>
          {studiodatas.value.studiodetails.map((item) => {
            return (
              <>
                <div class="address-container">
                  <p class="address-text">
                    <span class="locality">{item.locality}</span>-
                    <span class="place">{item.place}</span>-
                    <span class="district">{item.district}</span>-
                    <span class="state">{item.state}</span>-
                    <span class="state">{item.country}</span>-
                    <span class="state"> Pincode:{item.pincode}</span>
                  </p>
                  <Editstudiomodal studioId={item.id}/>
                  
                </div>
              </>
            );
          })}
        </Stack>
      </div>
    </div>
  );
};

export default Studio;
