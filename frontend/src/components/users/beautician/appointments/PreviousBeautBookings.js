import React,{useState,useEffect} from 'react'
import { toggleAppointments } from "../../../../feautures/beautician/beautnavigationslice";
import { useSelector, useDispatch } from "react-redux";
import { setAllappointments } from "../../../../feautures/customer/customerdataslice";
import axiosInstance from "../../../../axios/axiosconfig";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast, { Toaster } from "react-hot-toast";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const PreviousBeautBookings = () => {
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
          .post("beaut/get-previous-booking/", datas)
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

    // const handleCancelItem = (id) => {
    //     setCancelItemID(id);
    //     handleClickOpen();
    //   };

    const previouBookingClickHandler = () => {
        dispatch(toggleAppointments());
      };
  return (
    <div className="booking-outer">
      <Toaster />
      <div
        className="booking-hero"
        onClick={() => setBookingToggleHandler((prev) => !prev)}
      >
        PREVIOUS BOOKING <ArrowDropDownIcon />
      </div>
      {bookingToggleHandler && (
        <div className="previous-booking" onClick={previouBookingClickHandler}>
          BOOKING
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
  )
}

export default PreviousBeautBookings