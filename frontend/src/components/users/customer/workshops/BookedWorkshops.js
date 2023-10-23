import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../axios/axiosconfig";
import AspectRatio from "@mui/joy/AspectRatio";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CancelBookedWorkshopModal from "./CancelBookedWorkshopModal";
import toast, { Toaster } from 'react-hot-toast';
const BookedWorkshops = () => {
  const [allWorkshops, setAllWorkShops] = useState([]);
  const [noWS, setNoWS] = useState(false);
  const [reRender, setReRender] = useState(false);
  useEffect(() => {
    const datas = {
      custid: JSON.parse(localStorage.getItem("singledetails-C")).id,
    };
    axiosInstance.post("cust/get-currentuser-workshops/", datas).then((res) => {
      if (res.data.message === "no-workshops") {
        setNoWS(true);
      } else {
        setNoWS(false);
        setAllWorkShops(res.data.allworkshops);
      }
    });
  }, [reRender]);
  return (
    <div>
        <Toaster/>
      <div className="hero">BOOKED WORKSHOPS</div>
      <hr />
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
        The upcoming workshops booked by you are shown here
      </div>
      {noWS ? (
        <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
          NO BOOKED WORKSHOPS!
        </div>
      ) : (
        <div className="">
          {allWorkshops.map((item) => {
            return (
              <div className="flex justify-center">
                <Stack spacing={2} useFlexGap>
                  <Card variant="outlined" sx={{ width: 643 }}>
                    <CardContent orientation="horizontal">
                      <Avatar alt="Remy Sharp" src={item.beautician.image} />
                      <div>
                        <Typography sx={{ overflow: "hidden" }}>
                          {item.subject}
                        </Typography>
                        <Typography sx={{ overflow: "hidden" }}>
                          {item.beautician.name}
                          <hr />
                        </Typography>
                        <Typography sx={{ overflow: "hidden" }}>
                          <CalendarMonthIcon className="mr-2"/> {item.conducting_date}
                        </Typography>
                        <Typography sx={{ overflow: "hidden" }}>
                        <AccessTimeRoundedIcon className="mr-2"/>{item.start_time} -{item.end_time}
                        </Typography>
                        <Typography sx={{ overflow: "hidden" }}>
                        <CurrencyRupeeRoundedIcon className="mr-2"/>{item.price}/-
                        </Typography>
                        {/* <Typography sx={{ overflow: "hidden" }}>
                        <CalendarMonthIcon className="mr-2"/>{item.status}
                        </Typography> */}
                      </div>
                    </CardContent>
                    <AspectRatio ratio="21/9">
                    <Typography sx={{ overflowY: "auto" }}>
                          {item.description}
                        </Typography>
                    </AspectRatio>
                  
                    <Button color="danger">
                      <CancelBookedWorkshopModal id={item.id} setReRender={setReRender}/>
                      
                    </Button>
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

export default BookedWorkshops;
