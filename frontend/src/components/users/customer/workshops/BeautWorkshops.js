import React,{useEffect,useState} from 'react'
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
import axiosInstance from '../../../../axios/axiosconfig';
import WorkShopBookingFullScreenDialog from './WorkShopBookingFullScreenDialog';

const BeautWorkshops = () => {

    const [allWorkShops,setAllWorkShops]=useState([])
    const [noWorkShops,setNoWorkShops]=useState(false)
 
    
      useEffect(() => {
        const id = localStorage.getItem("id");

        const datas = {
          beautid: id,
        };
        axiosInstance
          .post("cust/get-beaut-workshops/", datas)
          .then((response) => {
            if(response.data.message==="no-workshop"){
                setNoWorkShops(true)

            }
            else{
                setAllWorkShops(response.data.allworkshops);
                setNoWorkShops(false)
            }
          
          })
          .catch(() => {
            alert("ERROR");
          });
      }, []);
  return (

    <div className="row justify-between">
        {allWorkShops.map((item) => {
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
                      <span className='text-danger'>{item.registration_deadline}</span>{" "}
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
                {/* <Button variant="outlined" color="neutral">
                  Boost
                </Button> */}
                {/* <DeleteWorkshopModal id={item.id} /> */}
                {/* <Button variant="solid" color="danger" onClick={()=> handleWorkShopBookNow(item.id)}>
                  Book Now
                </Button> */}
          
               
              </CardActions>
              <div className="flex justify-center">
                <WorkShopBookingFullScreenDialog id={item.id} allWorkShops={allWorkShops}/>


                </div>
            </Card>
          );
        })}
      </div>
  )
}

export default BeautWorkshops