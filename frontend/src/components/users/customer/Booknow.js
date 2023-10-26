import React, { useEffect, useState } from "react";
import Contents from "./Contents";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  setBookbeautdata,
  setBeautstudios,
  setBeautservices,
  setDate,
  setService,
  setStudio,
  setTime,
} from "../../../feautures/customer/customerdataslice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";
import axiosInstance from "../../../axios/axiosconfig";

import MenuItem from "@mui/material/MenuItem";
// import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Paypal from "../../paypal/Paypal";
import Review from "./reviews/Review";
// import {setService,setDate,setTime,setStudio} from "../../../feautures/customer/paymentdataslice"
import Fab from "@mui/material/Fab";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import WorkShopSpeedDial from "./workshops/WorkShopSpeedDial";
import BeautWorkshops from "./workshops/BeautWorkshops";

const Booknow = () => {
  const [startDate, setStartDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStudio, setSelectedStudio] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [beautStudios, setBeautStudios] = useState("DEYY");
  const [allBeauticians, setAllbeauticians] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [bookNowToggle, setBookNowToggle] = useState(false);
  const [workshopsPresent, setWorkshopsPresent] = useState(false);
  const [workshopToggle, setWorkshopToggle] = useState(false);

  const [alltime, setAlltime] = useState([
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    // Add more times as needed
  ]);
  const statedatas = useSelector((state) => state.login);
  const navdatas = useSelector((state) => state.custnavigation);
  const reqdatas = useSelector((state) => state.custreqdata);
  const paymentdatas = useSelector((state) => state.paymentdatas);
  const dispatch = useDispatch();

  useEffect(() => {
    //const allBeauticians = localStorage.getItem("allbeauticians-C");

    axiosInstance
      .get("cust/getallbeauticians/")
      .then((response) => {
        setAllbeauticians(response.data.allbeauticians);
        response.data.allbeauticians.filter((item) => {
          if (navdatas.value.booknowbeauticianid == item.id) {
            const reqbeaut = item;

            dispatch(setBookbeautdata(reqbeaut));

            return reqbeaut;
          }
        });
      })
      .catch((error) => {
        alert("ERROR");
      });
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");

    const datas = {
      beautid: id,
    };

    axiosInstance
      .post("cust/getbeautdatas/", datas)
      .then((res) => {
        if (res.data.message === "success") {
          dispatch(setBeautstudios(res.data.studiodata));
          dispatch(setBeautservices(res.data.servicedata));
        }
        if (res.data.message === "notsuccess") {
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");

    const datas = {
      beautid: id,
    };

    axiosInstance
      .post("cust/get-beaut-workshops/", datas)
      .then((res) => {
        if (res.data.message === "no-workshops") {
          setWorkshopsPresent(false);
        } else {
          setWorkshopsPresent(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="booknow-outer">
      <div className="hero">DETAILS</div>
      <hr />

      <div
        className={
          bookNowToggle || showReview || workshopToggle
            ? "expertin_minimized"
            : "expertin"
        }
      >
        <p>{reqdatas.value.bookbeautdata.name}</p>
        {bookNowToggle || showReview || workshopToggle ? (
          <Avatar
            src={reqdatas.value.bookbeautdata.image}
            sx={{
              width: 105,
              height: 105,
            }}
          />
        ) : (
          <Avatar
            src={reqdatas.value.bookbeautdata.image}
            sx={{
              width: 225,
              height: 225,
            }}
          />
        )}
        Expert In
        {reqdatas.value.beautservices
          .filter((item) => item.topservice === true)
          .map((item) => (
            <p key={item.id}> {item.service.name} </p>
          ))}
        <div className="flex">
          <div className="toggle-buttons">
            <Button
              onClick={() => {
                setBookNowToggle((prev) => !prev);
                setShowReview(false);
                setWorkshopToggle(false);
              }}
              sx={{
                marginLeft: "20px",
                marginTop: "10px",
                backgroundColor: "inherit",
                color: "black",
                "&:hover": {
                  backgroundColor: "grey",
                  opacity: [0.3, 1, 1],
                  color: "white",
                },
              }}
            >
              Book Now
            </Button>

            <div
              className="review-toggle"
              onClick={() => {
                setShowReview((prev) => !prev);
                setBookNowToggle(false);
                setWorkshopToggle(false);
              }}
            >
              <Button
                sx={{
                  marginTop: "10px",
                  backgroundColor: "inherit",
                  border: "black",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#212529",
                    color: "#D0D4D9", // Specify the desired background color on hover
                  },
                }}
                variant="oulined"
              >
                Show Reviews
              </Button>
            </div>

            <div className="">
              {workshopsPresent && (
                <WorkShopSpeedDial
                  toggleW={setWorkshopToggle}
                  toggleBN={setBookNowToggle}
                  toggleR={setShowReview}
                />
                // <Fab
                //   color="secondary"
                //   aria-label="edit"
                //   size="small"
                //   sx={{ margin: 2 }}
                // >
                //   <MoreHorizIcon />
                // </Fab>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {bookNowToggle && (
          <div className="box">
            <Stack
              spacing={2}
              sx={{
                marginTop: "70px",
              }}
            >
              <Paypal />
            </Stack>
          </div>
        )}
      </div>
      <hr />

      {showReview && (
        <div className="review mb-5">
          <Review />
        </div>
      )}

      {workshopToggle && (
        <div className="review">
          <BeautWorkshops />
        </div>
      )}
    </div>
  );
};

export default Booknow;

// <div>
//       <div className="expertin">
//         <p>{reqdatas.value.bookbeautdata.name}</p>
//         Expert In
//         {reqdatas.value.beautservices
//           .filter((item) => item.topservice === true)
//           .map((item) => (
//             <p key={item.id}> {item.service.name} </p>
//           ))}
//       </div>
// <Stack
//   spacing={2}
//   sx={{
//     marginTop: "70px",
//     marginLeft: "320px",
//   }}
// >
//   <Avatar
//     src={reqdatas.value.bookbeautdata.image}
//     sx={{
//       width: 225,
//       height: 225,
//     }}
//   />

//   <Paypal

//   />

//   <Button
//     variant="contained"
//     sx={{
//       width: "15%",
//       marginLeft: "590px",
//     }}
//     onClick={handleConfirm}
//   >
//     Confirm
//   </Button>
// </Stack>
//     </div>
