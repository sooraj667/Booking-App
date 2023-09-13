import React, { useEffect, useState } from "react";
import Contents from "./Contents";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setBookbeautdata } from "../../../feautures/customer/customerdataslice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";
import axiosInstance from "../../../axios/axiosconfig";
const Booknow = () => {
  const [startDate, setStartDate] = useState("");
  const statedatas = useSelector((state) => state.login);
  const navdatas = useSelector((state) => state.custnavigation);
  const reqdatas = useSelector((state) => state.custreqdata);
  const dispatch = useDispatch();
  const handleDateChange = (date) => {
    setStartDate(date);
    console.log(startDate, "DATE");
  };
  const handleConfirm=()=>{
       const datas={
        beautid:reqdatas.value.bookbeautdata.id,
        custid:statedatas.value.custdetails.id,
        date:startDate,
    }
    axiosInstance.post("cust/booknow/",datas).then((res)=>{
        console.log(res.data.message);
    }).catch((err)=>alert(err))
  }

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
        <Button variant="contained" sx={{
            width:"15%",marginLeft:"590px"
        }} onClick={handleConfirm}>Confirm</Button>
      </Stack>
    </div>
  );
};

export default Booknow;
