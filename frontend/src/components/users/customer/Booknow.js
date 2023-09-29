import React, { useEffect, useState } from "react";
import Contents from "./Contents";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  setBookbeautdata,
  setBeautstudios,
  setBeautservices,
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
import "./Browse.css"
import Paypal from "../../paypal/Paypal"
import {setService,setDate,setTime,setStudio} from "../../../feautures/customer/paymentdataslice"

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
    dispatch(setTime(e.target.value));
  };

  const handleStudioChange = (e) => {
    dispatch(setStudio(e.target.value));
    console.log(paymentdatas.value.studio);
  };

  const handleServiceChange = (e) => {
    dispatch(setService(e.target.value));
    console.log((e.target.value,"E.TARGET.VALUE"));
    console.log(paymentdatas.value.service);
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
    <div>
         <div className="expertin">
          <p>{reqdatas.value.bookbeautdata.name}</p>
          Expert In
        {reqdatas.value.beautservices
          .filter((item) => item.topservice === true) 
          .map((item) => (
            <p  key={item.id}  > {item.service.name} </p>
          ))}
          </div>
      <Stack
        spacing={2}
        sx={{
          marginTop: "70px",
          marginLeft: "320px",
        }}
      >
        <Avatar
          src={reqdatas.value.bookbeautdata.image}
          sx={{
            width: 225, 
            height: 225,
          }}
        />
     

        <InputLabel id="demo-simple-select-label">Choose Date</InputLabel>
        <DatePicker
          selected={paymentdatas.value.date}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          className="custom-datepicker"
        />
        <InputLabel id="demo-simple-select-label">Select Time</InputLabel>
        <select
          name="selectedTime"
          onChange={handleTimeChange}
        
          className=" form-control dateform"
        >
          {alltime.map((item) => {
            return <option>{item}</option>;
          })}
        </select>

        <InputLabel id="demo-simple-select-label">Choose Studio</InputLabel>
        <select
          name="selectedTime"
          onChange={handleStudioChange}
   
          className=" form-control dateform"
        >
          {reqdatas.value.beautstudios.map((item) => {
            return <option>{item.place}</option>;
          })}
        </select>
        <InputLabel id="demo-simple-select-label">Select Service</InputLabel>
        <select
          name="selectedTime"
          onChange={handleServiceChange}
       
          className=" form-control dateform"
        >
          {reqdatas.value.beautservices.map((item) => {
            return <option>{item.service.name}</option>;
          })}
        </select>
        {/* <InputLabel id="demo-simple-select-label">Select Studio</InputLabel>
        <select
          name="selectedTime"
          onChange={handleStudioChange}
          value={selectedStudio}
          className=" form-control dateform"
        >
          <option>Select Time</option>
          {reqdatas.value.beautstudios.map((item) => {
            return <option>{item}</option>;
          })}
        </select> */}

        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTime}
          label="Something"
          onChange={handleTimeChange}
        >
            
           {alltime.map((item) => {
            return <MenuItem>{item}</MenuItem>;
          })}
        </Select> */}

        <Paypal selectedService={selectedService} selectedStudio={selectedStudio} selectedTime={selectedTime} startDate={startDate}/>



        <Button
          variant="contained"
          sx={{
            width: "15%",
            marginLeft: "590px",
          }}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Stack>
  
    </div>
  );
};


export default Booknow;
