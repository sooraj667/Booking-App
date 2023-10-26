import React, { useState, useEffect } from "react";
import workshop_png from "../../../../images/Connected world-cuate.png";
import Avatar from "@mui/joy/Avatar";
import axiosInstance from "../../../../axios/axiosconfig";
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
import WorkShopBookingFullScreenDialog from "./WorkShopBookingFullScreenDialog";

const AllWorkshops = () => {
  const [allWorkshops, setAllWorkShops] = useState([]);
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
  return (
    <div>
      <div className="hero">WORKSHOPS</div>

      <div className="flex justify-center">
        <Avatar src={workshop_png} sx={{ width: 220, height: 220 }} />
      </div>
      {noWS ? (
        <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
          NO WORKSHOPS!
        </div>
      ) : (
        <div className="row justify-between">
          {allWorkshops.map((item) => {
            return (
              <Card
                variant="outlined"
                sx={{
                  width: 380,
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
                  <Avatar src={item.beautician.image}size="lg" />
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
                      <Typography level="title-sm">{item.conducting_date}</Typography>
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
                        <div className="text-danger">{item.registration_deadline}{" "}</div>
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

                  {/* <Button variant="solid" color="danger" onClick={()=> handleCancelWorkshopConfirm()}>
                  Cancel
                </Button> */}
                </CardActions>
                <div className="flex justify-center">
                  <WorkShopBookingFullScreenDialog
                    id={item.id}
                    allWorkShops={allWorkshops}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllWorkshops;
