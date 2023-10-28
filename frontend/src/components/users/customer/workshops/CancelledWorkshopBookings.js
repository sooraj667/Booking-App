import React, { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CancelBookedWorkshopModal from "./CancelBookedWorkshopModal";
import axiosInstance from "../../../../axios/axiosconfig";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

const CancelledWorkshopBookings = () => {
  const [allWorkshops, setAllWorkShops] = useState([]);
  const [noWS, setNoWS] = useState(false);
  useEffect(() => {
    const datas = {
      custid: JSON.parse(localStorage.getItem("singledetails-C")).id,
    };
    axiosInstance.post("cust/get-currentuser-cancelled-workshops/", datas).then((res) => {
      if (res.data.message === "no-workshops") {
        setNoWS(true);
      } else {
        setNoWS(false);
        setAllWorkShops(res.data.all_bookings);
      }
    });
  }, []);
  return (
    <div>
      <div className="hero">CANCELLED WORKSHOPS</div>
      <hr />
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
        The workshops cancelled by you are shown here
      </div>

      {noWS ? (
        <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
          NO CANCELLED WORKSHOPS!
        </div>
      ) : (
        <div className="">
          {allWorkshops.map((item) => {
            return (
              <div className="flex justify-center mb-4">
                <Stack spacing={2} useFlexGap>
                  <Card variant="outlined" sx={{ width: 643 }}>
                    <CardContent orientation="horizontal">
                      <Avatar alt="Remy Sharp" src={item.workshop.beautician.image} />

                      <div>
                        <Typography sx={{ overflow: "hidden" }}>
                          {item.workshop.subject}
                        </Typography>
                        <Typography sx={{ overflow: "hidden" }}>
                          {item.workshop.beautician.name}
                          <div className="flex text-danger">
                            Cancelled <ErrorOutlineRoundedIcon />
                           
                          </div>
                          <div className="">
                          You have cancelled this booking. 
                          </div>
                          <div className="text-success">
                          Amount refunded to your wallet <DoneRoundedIcon/>


                          </div>
                          <hr />
                        </Typography>

                        <Typography sx={{ overflow: "hidden" }}>
                          <CalendarMonthIcon className="mr-2" />{" "}
                          {item.workshop.conducting_date}
                        </Typography>
                        <Typography sx={{ overflow: "hidden" }}>
                          <AccessTimeRoundedIcon className="mr-2" />
                          {item.workshop.start_time} -{item.workshop.end_time}
                        </Typography>
                        <Typography sx={{ overflow: "hidden" }}>
                          <CurrencyRupeeRoundedIcon className="mr-2" />
                          {item.workshop.price}/-
                        </Typography>

                        {/* <Typography sx={{ overflow: "hidden" }}>
                        <CalendarMonthIcon className="mr-2"/>{item.status}
                        </Typography> */}
                      </div>
                    </CardContent>
                    <AspectRatio ratio="21/9">
                      <Typography sx={{ overflowY: "auto" }}>
                        {item.workshop.description}
                      </Typography>
                    </AspectRatio>

                    <Button color="danger">Rate</Button>
                  </Card>
                </Stack>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CancelledWorkshopBookings;
