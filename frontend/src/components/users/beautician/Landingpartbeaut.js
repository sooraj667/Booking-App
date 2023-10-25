import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Input, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import axiosInstance from "../../../axios/axiosconfig";
import Paper from "@mui/material/Paper";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Topstack from "./Topstack";
import "./Landingpartbeaut.css";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";

import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";

import SvgIcon from "@mui/joy/SvgIcon";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

const Landingpartbeaut = () => {
  const statedatas = useSelector((state) => state.login);
  const [todaysSchedule, setTodaysSchedule] = useState([]);
  const [noSchedule, setNoSchedule] = useState(false);

  const [todayDate, setTodaysDate] = useState("");
  const [day, setDay] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [walletAmount, setWalletAmount] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const beautid = JSON.parse(localStorage.getItem("singledetails-B"));
    const datas = {
      beautid: beautid.id,
    };
    console.log(datas, "NOKKADA");
    axiosInstance
      .post("beaut/todays-schedule/", datas)
      .then((response) => {
        if (response.data.message === "failed") {
          setNoSchedule(true);
          setTotalCount(response.data.count);
        } else {
          setTodaysSchedule(response.data.schedules);
          console.log(response.data.schedules, "fresh");
          setTotalCount(response.data.count);
        }
        setTodaysDate(response.data.date);
        setDay(response.data.day);
        setWalletAmount(response.data.wallet_amount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-around mt-5">
        <Card variant="solid"  invertedColors sx={{backgroundColor:"#BA68C8"}}>
          <CardContent orientation="horizontal">
            <CircularProgress size="lg" determinate value={0}>
              <SvgIcon>
              <CollectionsBookmarkIcon/>
              </SvgIcon>
            </CircularProgress>
            <CardContent>
              <Typography level="body-md">Total Bookings</Typography>
              <Typography level="h2">{totalCount}</Typography>
            </CardContent>
          </CardContent>
          <CardActions>
            {/* <Button variant="soft" size="sm">
              Add to Watchlist
            </Button>
            <Button variant="solid" size="sm">
              See breakdown
            </Button> */}
          </CardActions>
        </Card>

        <Card variant="solid" invertedColors sx={{backgroundColor:"#FF81AE"}}>
          <CardContent orientation="horizontal">
            <CircularProgress size="lg" determinate value={20}>
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
              </SvgIcon>
            </CircularProgress>
            <CardContent>
              <Typography level="body-md">Total Revenue</Typography>
              <Typography level="h2">$ {walletAmount}</Typography>
            </CardContent>
          </CardContent>
          <CardActions>
            {/* <Button variant="soft" size="sm">
              Add to Watchlist
            </Button>
            <Button variant="solid" size="sm">
              See breakdown
            </Button> */}
          </CardActions>
        </Card>

        {/* <div className="countdiv">
          <div className="">
            <h5>TOTAL BOOKINGS</h5>

            <div>
              <h2>{totalCount}</h2>
            </div>
          </div>
        </div>

        <div className="countdiv">
          <div className="">
            <h5>TOTAL BOOKINGS</h5>

            <div>
              <h2>{totalCount}</h2>
            </div>
          </div>
        </div>
        <div className="countdiv">
          <div className="">
            <h5>TOTAL BOOKINGS</h5>

            <div>
              <h2>{totalCount}</h2>
            </div>
          </div>
        </div> */}
      </div>

      <hr />
      <div className="sub-heading-div flex justify-center align-center py-3 text-medium fw-2 sgfont  themecolor ">
        TODAY'S SCHEDULES
      </div>
      <div className="flex justify-center mb-5">
        <Card
          variant="outlined"
          sx={{
            width: "max(400px, 60%)",
            borderRadius: 0,
            "--Card-radius": 0,
          }}
        >
          <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
            ALL BOOKINGS
          </div>
          <div className="border-b2"></div>

          {todaysSchedule.map((item) => {
            return (
              <>
                <CardContent orientation="horizontal">
                  <Avatar src={item.customer.image} alt="User Avatar" />
                  <div>
                    <Typography variant="h5">{item.customer.name}</Typography>
                    {/* <Typography variant="body1"> {item.service.service.name }</Typography> */}
                  </div>
                </CardContent>
                <CardContent sx={{ gap: 0.5, mt: 1 }}>
                  <Typography variant="body2">
                    <span className="mr-3">
                      {" "}
                      <NotListedLocationIcon />
                    </span>{" "}
                    {item.service.service.name}
                  </Typography>
                  <Typography variant="body2">
                    <span className="mr-3">
                      {" "}
                      <AccessAlarmIcon />
                    </span>{" "}
                    {item.time}
                  </Typography>
                  {/* <Typography variant="body2"> {item.status}</Typography> */}
                  <Typography variant="body2">
                    <span className="mr-3">
                      {" "}
                      <CreditScoreIcon />
                    </span>
                    {item.status}{" "}
                  </Typography>
                  <Typography variant="body2">
                    <span className="mr-3">
                      {" "}
                      <CurrencyRupeeIcon />
                    </span>
                    {item.service.servicefee}/-{" "}
                  </Typography>
                  <Typography variant="body2">
                    <span className="mr-3">
                      {" "}
                      <LocationOnIcon />
                    </span>
                    {item.studio.studio_name},{item.studio.locality},
                    {item.studio.place},{item.studio.district},
                    {item.studio.state},{" "}
                  </Typography>
                </CardContent>
                <div className="border-b1 flex justify-center"></div>
              </>
            );
          })}

          {noSchedule && (
            <div className="no-schedule">No Bookings for today!</div>
          )}
        </Card>
      </div>

      {/* <div className="countmaindiv">
        <div className="countdiv">
          <h5>TOTAL BOOKINGS</h5>

          <div>
            <h2>{totalCount}</h2>
          </div>
        </div>
        <div className="countdiv"></div>
      </div>

      <div className="schedule-outer">
        <div className="schedule-box">
          <div className="top">
            <div className="col-md-8 headingg">SCHEDULES</div>
            <div className="col-md-4 datee">
              {day} {todayDate}
            </div>
          </div>
          <hr />
          <div className="sch-content">
            {noSchedule ? <div className="no-schedule">No Bookings!</div> : ""}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Landingpartbeaut;
