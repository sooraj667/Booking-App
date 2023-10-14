import React, { useEffect, useState } from "react";
import { Input, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
// import Topstackcust from "../Topstackcust";
import { useSelector, useDispatch } from "react-redux";
// import { setAllappointments } from "../../../../feautures/customer/customerdataslice";
import axiosInstance from "../../../../axios/axiosconfig";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
// import "./Bookings.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import toast, { Toaster } from "react-hot-toast";
import PreviousBeautBookings from "./PreviousBeautBookings";
import {togglePreviousBooking} from "../../../../feautures/beautician/beautnavigationslice"
const Appointments = () => {
  const custdata = useSelector((state) => state.login);
  const reqdatas = useSelector((state) => state.custreqdata);
  const[allAppointments,setAllAppointments]=useState([])
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [bookingToggleHandler, setBookingToggleHandler] = useState(false);

  useEffect(() => {
    const beautdetails = JSON.parse(localStorage.getItem("singledetails-B"));
    console.log(beautdetails, "################3");

    const datas = {
      beautid: beautdetails.id,
    };
    axiosInstance
      .post("beaut/getbookings/", datas)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data.appointmentdata, "########################");
          //   const parseddata=JSON.parse(res.data.studiodata)
          //   console.log(parseddata,"PARSEDDATA");
          setAllAppointments(res.data.appointmentdata)
          //dispatch(setBeautservices(res.data.servicedata));
        }
        if (res.data.message === "notsuccess") {
          console.log("not success");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const addressHandler = (id) => {
    if (address == "") {
      setAddress(id);
    } else {
      setAddress("");
    }
  };

  const previouBookingClickHandler = () => {
    dispatch(togglePreviousBooking());
  };
  return (
    <div className="booking-outer">
      <Toaster />
      <div
        className="booking-hero"
        onClick={() => setBookingToggleHandler((prev) => !prev)}
      >
        BOOKINGS <ArrowDropDownIcon />
      </div>
      {bookingToggleHandler && (
        <div className="previous-booking" onClick={previouBookingClickHandler}>
          PREVIOUS BOOKINGS
        </div>
      )}
      <hr />
      <div className="flex">
        {console.log(reqdatas.value.allappointments, "BYDUBAI")}

        <section className="aboutHome">
          <div className="container flexSB">
            {/* <div className='left row'>
            <img src={"https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80"} alt='' />
          </div> */}
            <div className="right row">
              {/* <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' /> */}
              <div className="items">
                {allAppointments.map((val) => {
                  return (
                    <>
                      <div className="item flexSB">
                        <div className="img">
                          <img src={val.customer.image} alt="" />
                          <div className="text">
                            <h2 key={val.id}>{val.customer.name}</h2>
                            <hr />
                            <p>
                              Service -{val.service.service.name} <br />
                              Amount Paid - {val.service.servicefee}
                            </p>
                          </div>
                        </div>
                        <div className="text">
                          <p>
                            Date - {val.date} <br />
                            Time - {val.time}
                          </p>
                          <hr />
                          <div onClick={() => addressHandler(val.id)}>
                            ADDRESS <ArrowDropDownIcon />
                          </div>
                          {address === val.id && (
                            <p>
                              Address - {val.studio.locality} <br />{" "}
                              {val.studio.place} <br /> {val.studio.district}{" "}
                              <br /> {val.studio.state} <br />{" "}
                              {val.studio.country} <br /> pincode -{" "}
                              {val.studio.pincode} <br />{" "}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>




















    // <div>
    //   {/* <Topstackcust/> */}

    //   <Paper
    //     elevation={24}
    //     sx={{
    //       width: 900,
    //       height: "auto",
    //       backgroundColor: "#F5FFFA",
    //       margin: "20px auto",
    //       padding: "20px",
    //       borderRadius: "12px",
    //       transition: "background-color 0.3s, opacity 0.3s",
    //       opacity: [0.9, 0.8, 0.8],
    //       "&:hover": {
    //         backgroundColor: "whitesmoke",
    //         opacity: [0.9, 0.8, 0.7],
    //       },
    //     }}
    //   >
    //     <div
    //       className="heading"
    //       style={{
    //         fontSize: "1.5rem",
    //         fontWeight: "bold",
    //         marginLeft: "320px",
    //       }}
    //     >
    //       All Bookings
    //     </div>

    //     {allAppointments.map((item, index) => (
    //       <Stack
    //         spacing={2}
    //         className="stackdiv"
    //         key={index}
    //         sx={{
    //           borderBottom: "1px solid #ddd",
    //           marginBottom: "10px",
    //           paddingBottom: "10px",
    //         }}
    //       >
    //         <div className="row">
    //           <div className="col-md-8">
    //             <div className="titles" style={{ fontWeight: "bold" }}>
    //               Date:
    //             </div>
    //             <div className="values">{item.date}</div>

    //             <div className="titles" style={{ fontWeight: "bold" }}>
    //               Time:
    //             </div>
    //             <div className="values">{item.time}</div>

    //             <div className="titles" style={{ fontWeight: "bold" }}>
    //               Studio Address:
    //             </div>
    //             <div className="values">
    //               {`${item.studio.locality}, ${item.studio.place}, ${item.studio.district}, ${item.studio.state}`}
    //             </div>

    //             <div className="titles" style={{ fontWeight: "bold" }}>
    //               Service:
    //             </div>
    //             <div className="values">{item.service.service.name}</div>

    //             <div className="titles" style={{ fontWeight: "bold" }}>
    //               Amount:
    //             </div>
    //             <div className="values">{item.service.servicefee}</div>
    //           </div>
    //           <div className="col-md-4">
    //             <Avatar
    //               alt={item.customer.name}
    //               src={item.customer.image}
    //               sx={{ width: 120, height: 120, borderRadius: "50%" }}
    //             />
    //             <div className="titles" style={{ fontWeight: "bold" }}>
    //               Appointment with:
    //             </div>
    //             <div className="values">{item.customer.name}</div>
    //           </div>
    //         </div>
    //       </Stack>
    //     ))}
    //   </Paper>
    // </div>
  );
};

export default Appointments;
