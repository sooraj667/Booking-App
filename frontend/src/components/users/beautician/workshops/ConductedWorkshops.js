import React,{useState,useEffect} from 'react'
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
// import CancelBookedWorkshopModal from "./CancelBookedWorkshopModal";
import axiosInstance from '../../../../axios/axiosconfig';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import MenuTab from './MenuTab';

const ConductedWorkshops = () => {
    const [allWorkshops, setAllWorkShops] = useState([]);
    const [noWS, setNoWS] = useState(false);
    useEffect(() => {
        const datas = {
          beautid: JSON.parse(localStorage.getItem("singledetails-B")).id,
        };
        axiosInstance.post("beaut/get-currentbeaut-completed-workshops/", datas).then((res) => {
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
        <div className="flex justify-center">
      <div className="sub-heading-div flex justify-center align-center py-3 text-medium fw-2 sgfont  themecolor ">COMPLETED WORKSHOPS</div>
      <div className="mt-4 ml-2"><MenuTab/></div>

      </div>
      <hr />
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
        The workshops conducted by you are shown here
      </div>


      {noWS ? (
        <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
          NO WORKSHOPS CONDUCTED YET!
        </div>
      ) : (
        <div className="">
          {allWorkshops.map((item) => {
            return (
              <div className="flex justify-center mb-4">
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
                          <div className="flex text-success">
                        You have conducted this workshop <DoneAllRoundedIcon/>
                      </div>
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
                  
                    {/* <Button color="danger">
                     Rate
                      
                    </Button> */}
                  </Card>
                </Stack>
              </div>
            );
          })}
        </div>
      )}

    </div>
  )
}

export default ConductedWorkshops