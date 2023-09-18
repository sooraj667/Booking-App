import React, { useEffect, useState } from "react";
import Contents from "./Contents";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  setBookbeautdata,
  setBeautstudios,
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


const Booknow = () => {
  const [startDate, setStartDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStudio, setSelectedStudio] = useState("");
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
  const dispatch = useDispatch();
  const handleDateChange = (date) => {
    setStartDate(date);
    console.log(startDate, "DATE");
  };
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleStudioChange = (e) => {
    setSelectedStudio(e.target.value);
  };

  const handleConfirm = () => {
    const datas = {
      beautid: reqdatas.value.bookbeautdata.id,
      custid: statedatas.value.custdetails.id,
      date: startDate,
      time: selectedTime,
      studio:selectedStudio,
    };
    axiosInstance
      .post("cust/booknow/", datas)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    const allBeauticians = localStorage.getItem("allbeauticians-C");
    console.log(navdatas.value.booknowbeauticianid, "BEAUTID");

    if (allBeauticians) {
      const allbeaut_parsed = JSON.parse(allBeauticians);
      allbeaut_parsed.filter((item) => {
        if (navdatas.value.booknowbeauticianid == item.id) {
          const reqbeaut = item;
          console.log(reqbeaut, "REQBEAUT####");
          dispatch(setBookbeautdata(reqbeaut));

          return reqbeaut;
        }
      });
    }
  }, []);

  useEffect(() => {
    const datas = {
      beautid: reqdatas.value.bookbeautdata.id,
    };
    axiosInstance
      .post("cust/beautstudio/", datas)
      .then((res) => {
        if (res.data.message==="success") {
          console.log(res.data.studiodata);
        //   const parseddata=JSON.parse(res.data.studiodata)
        //   console.log(parseddata,"PARSEDDATA");
        dispatch(setBeautstudios(res.data.studiodata))
         
        }
        if (res.data.message==="notsuccess") {
            console.log("not success");
            
          }
      })
      .catch((err) => console.log(err))
  },[]);

  return (
    <div>
      <Stack
        spacing={2}
        sx={{
          marginTop: "70px",
          marginLeft: "220px",
        }}
      >
        <Avatar
          src={reqdatas.value.bookbeautdata.image}
          sx={{
            width: 225,
            height: 225,
          }}
        />
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          className="custom-datepicker"
        />
        <InputLabel id="demo-simple-select-label">Select Time</InputLabel>
        <select
          name="selectedTime"
          onChange={handleTimeChange}
          value={selectedTime}
          className=" form-control dateform"
        >
          <option>Select Time</option>
          {alltime.map((item) => {
            return <option>{item}</option>;
          })}
        </select>


        <select
          name="selectedTime"
          onChange={handleStudioChange}
          value={selectedTime}
          className=" form-control dateform"
        >
          <option>Select Time</option>
          {reqdatas.value.beautstudios.map((item) => {
            return <option>{item.place}</option>;
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
      {console.log(reqdatas.value.beautstudios,"DDDDDDDDDDDDDDDD")}
         {console.log("HANNAAAAAAAAAAAAAAAA")}
    </div>
  );
};

export default Booknow;