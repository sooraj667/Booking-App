import React,{useState} from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast,{Toaster} from 'react-hot-toast';
import axiosInstance from '../../axios/axiosconfig';
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
const Paypal = ( ) => {
    const reqdatas = useSelector((state) => state.custreqdata);
    const statedatas = useSelector((state) => state.login);
    const paymentdatas = useSelector((state) => state.paymentdatas);

    const [startDate, setStartDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedStudio, setSelectedStudio] = useState("");
    const [selectedService, setSelectedService] = useState("");

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


    const handleDateChange = (date) => {
        setStartDate(date);
        localStorage.setItem("date",date)
      };
      const handleTimeChange = (e) => {
        console.log(e.target.value, "TIME");
        setSelectedTime(e.target.value);
        localStorage.setItem("time",e.target.value)
      };
    
      const handleStudioChange = (e) => {
        console.log(e.target.value, "STUDIO");
        setSelectedStudio(e.target.value);
        localStorage.setItem("studio",e.target.value)
      };
    
      const handleServiceChange = (e) => {
        console.log(e.target.value, "SERVICE");
        setSelectedService(e.target.value);
        localStorage.setItem("service",e.target.value)
      };
  return (
    <>
    {console.log(`${selectedService}${selectedStudio} ${startDate} ${selectedTime} MYRRRRRRRRRRR`)}
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
          name="selectedStudio"
          onChange={handleStudioChange}
          className=" form-control dateform"
        >
          {reqdatas.value.beautstudios.map((item) => {
            return <option>{item.place}</option>;
          })}
        </select>
        <InputLabel id="demo-simple-select-label">Select Service</InputLabel>
        <select
          name="selectedService"
          onChange={handleServiceChange}
          className=" form-control dateform"
        >
          {reqdatas.value.beautservices.map((item) => {
            return <option>{item.service.name}</option>;
          })}
        </select>

    <PayPalScriptProvider options={{ clientId: "AeaCyw6WUYkOvfUXMp0ScN2r6KEfhVvxWytZvEAlbUXH_NoQsJ70TyTabFoedoIEkqTTwI5kUtFoaauE" }}>
            <PayPalButtons createOrder={
                (data,actions)=>{
                    return actions.order.create({
                        purchase_units:[
                            {
                                amount:{
                                    value:"2.00"

                                }
                            }
                        ]
                    })
                }
            }
            onApprove={()=>{
                toast.success("Payment successfully completed!")
                const datas={
                    beautid: reqdatas.value.bookbeautdata.id,
                    custid: statedatas.value.custdetails.id,
                    date: localStorage.getItem("date"),
                    time: localStorage.getItem("time"),
                    studio: localStorage.getItem("studio"),
                    servicename: localStorage.getItem("service")
                    
                }
                console.log(datas,"MWONEEEEEEEEEEEEE");
                axiosInstance.post("cust/booknow/",datas).then((response)=>{
                    console.log(response,"RESRERSRERSRERSR");
                }).catch((error)=>alert(error))
            }}
            onCancel={()=>{
                toast.error("You cancelled the payment!")
            }}
            onError={()=>{
                toast.error("Error!")
            }}
            
             />
             <Toaster/>
        </PayPalScriptProvider>
    
    </>
   
  )
}

export default Paypal