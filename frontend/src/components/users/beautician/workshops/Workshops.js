import React, { useState, useEffect } from "react";

import workshop_png from "../../../../images/Connected world-cuate.png";

import AddWorkshopModal from "./AddWorkshopModal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import axiosInstance from "../../../../axios/axiosconfig";
import { setAllWorkshops } from "../../../../feautures/beautician/workshopslice";

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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReportIcon from "@mui/icons-material/Report";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DeleteWorkshopModal from "./DeleteWorkshopModal";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import toast, { Toaster } from 'react-hot-toast';




import CircularProgress from '@mui/joy/CircularProgress';

import SvgIcon from '@mui/joy/SvgIcon';

const Workshops = () => {
  const dispatch = useDispatch();
  const workshops = useSelector((state) => state.workshops);
  const [todaysWS, setTodaysWS] = useState(false);

  const datas = {
    id: JSON.parse(localStorage.getItem("singledetails-B")).id,
  };

  useEffect(() => {
    axiosInstance
      .post("beaut/get-beaut-workshops/", datas)
      .then((response) => {
        if (response.data.ws_for_today === "no") {
          setTodaysWS(false);
        } else {
          setTodaysWS(response.data.todays_workshops);
        }
        dispatch(setAllWorkshops(response.data.allworkshops));
      })
      .catch(() => {
        alert("ERROR");
      });
  }, []);

  const handleSendEmail=(id)=>{
    const datas={
      workshop_id:id,
    }
    axiosInstance.post("beaut/send-email-link/",datas).then((res)=>{
      if(res.data.message==="already-sent"){
        toast("Email Already Sent!")
      }
      else{
        toast.success("Mail Sent")
      }
    }).catch((error)=>{
      alert(error)
    })
    

  }

  return (
    <div>
      <Toaster/>
      <div className="hero">WORKSHOPS</div>
      <div className="flex justify-center">
        <Avatar src={workshop_png} sx={{ width: 220, height: 220 }} />
      </div>
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
        UPCOMING WORKSHOPS
        <AddWorkshopModal />
      </div>
      {todaysWS && (
        <div className="flex">
          {todaysWS.map((item) => {
            return (
              <div className="col-4">
                <Card variant="solid" color="primary" invertedColors>
                  <CardContent orientation="horizontal">
                    {/* <CircularProgress size="lg" determinate value={20}>
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
                    </CircularProgress> */}
                    <WhatshotIcon />
                    <CardContent>
                    <Typography level="body-md">TODAY'S WORKSHOP  </Typography>
                      <Typography level="body-md">{item.subject}  </Typography>
                      <Typography level="h2"><AccessTimeFilledIcon/> {item.start_time}</Typography>
                    </CardContent>
                  </CardContent>
                  <CardActions>
                    <Button variant="soft" size="sm">
                      Add to Watchlist
                    </Button>
                    <Button variant="solid" size="sm" onClick={()=>handleSendEmail(item.id)}>
                      Send Link Via Mail
                    </Button>
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      <div className="row justify-around">
        {workshops.value.allworkshops.map((item) => {
          return (
            <Card
              variant="outlined"
              sx={{
                width: 320,
                // to make the card resizable
                overflow: "auto",
                resize: "horizontal",
                margin: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* <Avatar src="/static/images/avatar/1.jpg" size="lg" /> */}
                <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                  {item.customers.map((val) => {
                    return <Avatar src={val.image} />;
                  })}
                  <Avatar src="/static/images/avatar/2.jpg" />
                  <Avatar src="/static/images/avatar/3.jpg" />
                  <Avatar src="/static/images/avatar/4.jpg" />
                  <Avatar>+4K</Avatar>
                </AvatarGroup>
              </Box>
              <CardContent>
                <Typography level="title-lg">{item.subject}</Typography>
                <Typography level="body-sm">{item.description}</Typography>
                <div className="border-b1"></div>

                <div className="flex justify-around">
                  <div className="col-md-2"></div>
                  <div className="col-md-5">
                    <CalendarMonthIcon />
                  </div>
                  <div className="col-md-5">
                    <Typography level="title-sm">{item.date}</Typography>
                  </div>
                  <div className="col-md-2"></div>
                </div>

                <div className="flex justify-around">
                  <div className="col-md-2"></div>
                  <div className="col-md-5">
                    <AccessTimeIcon />
                  </div>
                  <div className="col-md-5">
                    <Typography level="title-sm">
                      {item.start_time} - {item.end_time}{" "}
                    </Typography>
                  </div>
                  <div className="col-md-2"></div>
                </div>

                <div className="flex justify-around">
                  <div className="col-md-2"></div>
                  <div className="col-md-5">
                    <CurrencyRupeeIcon />
                  </div>
                  <div className="col-md-5">
                    <Typography level="title-sm"> {item.price} </Typography>
                  </div>
                  <div className="col-md-2"></div>
                </div>

                <div className="flex justify-around">
                  <div className="col-md-2"></div>
                  <div className="col-md-5">
                    <CreditScoreIcon />
                  </div>
                  <div className="col-md-5">
                    <Typography level="title-sm"> {item.status} </Typography>
                  </div>
                  <div className="col-md-2"></div>
                </div>

                <div className="flex justify-around">
                  <div className="col-md-2"></div>
                  <div className="col-md-5">
                    <ReportIcon />
                  </div>
                  <div className="col-md-5">
                    <Typography level="title-sm">
                      {" "}
                      {item.registration_deadline}{" "}
                    </Typography>
                  </div>
                  <div className="col-md-2"></div>
                </div>
              </CardContent>
              <CardActions buttonFlex="0 1 120px">
                {/* <IconButton
                  variant="outlined"
                  color="neutral"
                  sx={{ mr: "auto" }}
                >
                  <FavoriteBorder />
                </IconButton> */}
                <Button variant="outlined" color="neutral">
                  Boost
                </Button>
                <DeleteWorkshopModal id={item.id} />
                {/* <Button variant="solid" color="danger" onClick={()=> handleCancelWorkshopConfirm()}>
                  Cancel
                </Button> */}
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Workshops;
