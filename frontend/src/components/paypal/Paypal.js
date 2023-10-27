import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../axios/axiosconfig";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import InputLabel from "@mui/material/InputLabel";
import moment from "moment";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BookIcon from '@mui/icons-material/Book';

import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import PayUsingWalletModal from "../users/walletmodal/PayUsingWalletModal";
import {setBookingFee} from "../../feautures/variableSlice"
import Razorpay from "../razorpay/Razorpay";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Paypal = () => {
  const reqdatas = useSelector((state) => state.custreqdata);
  const statedatas = useSelector((state) => state.login);
  const paymentdatas = useSelector((state) => state.paymentdatas);
  const dispatch=useDispatch()

  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStudio, setSelectedStudio] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [dateError, setDateError] = useState(false);
  const [slotNotAvailable, setSlotNotAvailable] = useState(false);
  const [selectedFeeForPayment, setSelectedFeeForPayment] =
    useState("IVDE ONNULA");



  const [showChooseStudio, setShowChooseStudio] = useState(true);
  const [showChooseTime, setShowChooseTime] = useState(true);
  const [showChooseService, setShowChooseService] = useState(true);
  const [showChooseDate, setShowChooseDate] = useState(true);
  

  const navigate = useNavigate();

  const [alltime, setAlltime] = useState([
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",

  ]);

  const handleDateChange = (date) => {
    setShowChooseDate(false)
    setStartDate(date);
    localStorage.setItem("date", date);
    const currentdate = new Date();
    if (date < currentdate) {
      setDateError(true);
      setSlotNotAvailable(false);
    } else {
      setDateError(false);
    }
  };
  const handleTimeChange = (e) => {
    setShowChooseTime(false)
    console.log(e.target.value, "TIME");
    setSelectedTime(e.target.value);
    localStorage.setItem("time", e.target.value);

    const datas = {
      time: e.target.value,
      date: localStorage.getItem("date"),
    };
    console.log(datas, "LETS SEEll");
    axiosInstance
      .post("cust/check-availability/", datas)
      .then((response) => {
        console.log(response.data, "AVAILABILITY");
        if (response.data.message == "Not Available") {
          setSlotNotAvailable(true);
          setDateError(false);
        } else {
          setSlotNotAvailable(false);
        }
      })
      .catch((error) => console.log("AVAILABILITY ERROR"));
  };

  const handleStudioChange = (e) => {
    setShowChooseStudio(false)
    console.log(e.target.value, "STUDIO");
    setSelectedStudio(e.target.value);
    localStorage.setItem("studio", e.target.value);
  };

  const handleServiceChange = (e) => {
    setShowChooseService(false)
    console.log(e.target.value, "SERVICE");

    const parts = e.target.value.split("Rs ")
    const part1 = parts[1];
    const fee = part1.split("/-")[0];
    console.log("FEE IS ", fee);
    setSelectedFeeForPayment(fee);
    dispatch(setBookingFee(fee))

    setSelectedService(e.target.value);
    localStorage.setItem("service", e.target.value);
    // const numberValue = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
    // setSelectedFeeForPayment(numberValue.toString());
  };
  useEffect(() => {
    console.log("Changed");
  }, [selectedFeeForPayment]);
  return (
    <>
      {console.log(selectedFeeForPayment, "#######################")}
      {console.log(
        `${selectedService}${selectedStudio} ${startDate} ${selectedTime} deyyyy`
      )}

      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "100%",
          width:"40vw",
          mx: "auto",
          // to make the demo resizable
          overflow: "auto",
          resize: "horizontal",
          
        }}
      >
        <Typography level="title-lg" startDecorator={<BookIcon />} >
          Book Now
        </Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}
        >
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Select Date</FormLabel>
            <DatePicker
              selected={showChooseDate ? null : startDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              className=" inputform form-control"
            />
            {dateError && (
              <Alert
                severity="error"
                sx={{
                  marginTop: "20px",
                  // marginLeft: "70px",
                }}
              >
                Please Choose Valid Date
              </Alert>
            )}
            {/* <Input endDecorator={<CreditCardIcon />} /> */}
          </FormControl >
          {console.log(selectedFeeForPayment,"MAINFEE IPOLATHE")}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Select Time</FormLabel>
            <select
              name="selectedTime"
              onChange={handleTimeChange}
              className=" form-control inputform"
            >
               {showChooseTime && <option value="">Choose Time</option> }
              {alltime.map((item) => {
                return <option>{item}</option>;
              })}
            </select>
            {showChooseTime && <option value="">Choose Time</option> }
            {slotNotAvailable && (
              <Alert
                severity="error"
                sx={{
                  marginTop: "20px",
                  marginLeft: "70px",
                }}
              >
                Slot Already Booked! Choose Another Slot
              </Alert>
            )}
          </FormControl>
          {/* <FormControl >
            <FormLabel>NIL</FormLabel>
            <Input endDecorator={<InfoOutlined />} />
          </FormControl> */}
          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Choose Studio</FormLabel>
            <select
              name="selectedStudio"
              onChange={handleStudioChange}
              className=" form-control inputform "
            >

              {showChooseStudio && <option value="">Choose studio</option> }
              
              {reqdatas.value.beautstudios.map((item) => {
                return <option>{item.place}</option>;
              })}
            </select>
          </FormControl>

          <FormControl sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Choose Service</FormLabel>
            <select
              name="selectedService"
              onChange={handleServiceChange}
              className=" form-control inputform"
            >
             {showChooseService && <option value="">Choose Service</option> }
              {reqdatas.value.beautservices.map((item) => {
                return (
                  <option>
                    {item.service.name} - Rs {item.servicefee}/-
                  </option>
                );
              })}
            </select>
          </FormControl>
          <Checkbox label="Save card" sx={{ gridColumn: "1/-1", my: 1 }} />
          <CardActions sx={{ gridColumn: "1/-1" }}>
            <Button variant="solid"  sx={{backgroundColor:"#0C0335"}}>
            {dateError || slotNotAvailable ? (
        ""
      ) : (
        <PayPalScriptProvider
          options={{
            clientId:
              "AeaCyw6WUYkOvfUXMp0ScN2r6KEfhVvxWytZvEAlbUXH_NoQsJ70TyTabFoedoIEkqTTwI5kUtFoaauE",

              
          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "1",
                    },
                  },
                ],
              });
            }}
            onApprove={() => {
              toast.success("Payment successfully completed!");
              localStorage.setItem(
                "bookedbeautid",
                reqdatas.value.bookbeautdata.id
              );
              localStorage.setItem(
                "bookedcustid",
                statedatas.value.custdetails.id
              );

              const datas = {
                beautid: reqdatas.value.bookbeautdata.id,
                custid: statedatas.value.custdetails.id,
                date: localStorage.getItem("date"),
                time: localStorage.getItem("time"),
                studio: localStorage.getItem("studio"),
                servicename: localStorage.getItem("service"),
                type:"paypal",
              };
             
              axiosInstance.post("cust/booknow/", datas).then((response) => {
                console.log(response, "RESRERSRERSRERSR");
              });

              setTimeout(navigate("../booking-completed"), 2000).catch(
                (error) => alert(error)
              );
            }}
            onCancel={() => {
              toast.error("You cancelled the payment!");
            }}
            onError={() => {
              toast.error("Error!");
            }}
          />
          <Toaster />
        </PayPalScriptProvider>
      ) }
    







      
   







            </Button>

         

           

            
          </CardActions>

          
        </CardContent>
        {
              dateError || slotNotAvailable ? ("") :
              (
                // <Button sx={{bgcolor:"#FFC439"}}>Pay Using Wallet</Button>
                <PayUsingWalletModal />
              )
            }

            <Razorpay fee={selectedFeeForPayment} for="normal" id="nil"/>
        
      </Card>

      
      
      <hr />
      
      {console.log(selectedFeeForPayment, "FEEEE")}
      {console.log(typeof selectedFeeForPayment, "TYPE")}
    </>
  );
};

export default Paypal;
