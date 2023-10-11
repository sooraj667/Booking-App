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
import "./Browse.css";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import "./Browse.css";
import Paypal from "../../paypal/Paypal";
// import {setService,setDate,setTime,setStudio} from "../../../feautures/customer/paymentdataslice"

const Booknow = () => {
  const [startDate, setStartDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStudio, setSelectedStudio] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [beautStudios, setBeautStudios] = useState("DEYY");
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

  const handleDateChange = (date) => {
    dispatch(setDate(date));
  };
  const handleTimeChange = (e) => {
    console.log(e.target.value, "TIME");
    dispatch(setTime(e.target.value));
  };

  const handleStudioChange = (e) => {
    console.log(e.target.value, "STUDIO");
    dispatch(setStudio(e.target.value));
  };

  const handleServiceChange = (e) => {
    console.log(e.target.value, "SERVICE");
    dispatch(setService(e.target.value));
  };

  const handleConfirm = () => {
    const datas = {
      beautid: reqdatas.value.bookbeautdata.id,
      custid: statedatas.value.custdetails.id,
      date: startDate,
      time: selectedTime,
      studio: selectedStudio,
      servicename: selectedService,
    };

    axiosInstance
      .post("cust/booknow/", datas)
      .then((res) => {})
      .catch((err) => alert(err));
  };

  useEffect(() => {
    const allBeauticians = localStorage.getItem("allbeauticians-C");

    if (allBeauticians) {
      const allbeaut_parsed = JSON.parse(allBeauticians);
      allbeaut_parsed.filter((item) => {
        if (navdatas.value.booknowbeauticianid == item.id) {
          const reqbeaut = item;

          dispatch(setBookbeautdata(reqbeaut));

          return reqbeaut;
        }
      });
    }
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

  return (
    <div className="booknow-outer">
      <div className="expertin">
        <p>{reqdatas.value.bookbeautdata.name}</p>
        Expert In
        {reqdatas.value.beautservices
          .filter((item) => item.topservice === true)
          .map((item) => (
            <p key={item.id}> {item.service.name} </p>
          ))}
      </div>
      <div className="flex">
        <div className="box">
        <Stack
        spacing={2}
        sx={{
          marginTop: "70px",
          
        }}
      >
        <Avatar
          src={reqdatas.value.bookbeautdata.image}
          sx={{
            width: 225,
            height: 225,
          }}
        />

        <Paypal

        />

        {/* <Button
          variant="contained"
          sx={{
            width: "15%",
            marginLeft: "590px",
          }}
          onClick={handleConfirm}
        >
          Confirm
        </Button> */}
      </Stack>

        </div>
    
      



      </div>
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
