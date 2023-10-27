import React from "react";
import Button from "@mui/joy/Button";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axios/axiosconfig";
import { useNavigate } from "react-router-dom";

const Razorpay = (props) => {
  const navigate = useNavigate();
  const reqdatas = useSelector((state) => state.custreqdata);
  const statedatas = useSelector((state) => state.login);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  //   const handleModalToggle = () => {
  //     setShowModal(!showModal);
  //   };
  const displayRazorpay = async () => {
    if (props.for === "normal") {
      const beautid = reqdatas.value.bookbeautdata.id;
      const custid = statedatas.value.custdetails.id;
      const date = localStorage.getItem("date");
      const time = localStorage.getItem("time");
      const studio = localStorage.getItem("studio");
      const servicename = localStorage.getItem("service");
      console.log(`${date} ${time} ${studio} ${servicename}  `);
      if (!date || !time || !studio || !servicename) {
        toast.error("Select All values");
        return;
      }
    }

    const details = localStorage.getItem("singledetails-C");
    if (details) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("You are offline.. failed to load razorpay");
        return;
      }
      const options = {
        key: "rzp_test_dpiSP2IlPN5nSf",
        currency: "INR",
        amount: props.fee * 100,
        name: "User",
        description: "Thanks for purchasing",

        handler: function (response) {
          if (props.for === "normal") {
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
              type: "razorpay",
            };

            axiosInstance.post("cust/booknow/", datas).then((response) => {
              console.log(response, "RESRERSRERSRERSR");
            });

            navigate("../workshop-booking-completed");
          }
          if (props.for === "workshop") {
            const datas = {
              workshopid: props.id,
              custid: JSON.parse(
                localStorage.getItem("singledetails-C")
              ).id,
              type: "razorpay",
            };

            axiosInstance.post("cust/workshop-booknow/", datas).then((response) => {
              console.log(response, "RESRERSRERSRERSR");
            });

            navigate("../workshop-booking-completed");
          }
        },
        prefill: {
          name: "Arun",
        },
      };
      const paymentObj = new window.Razorpay(options);
      paymentObj.open();
    } else {
      //   navigate("/login");
      alert("ELSE");
    }
  };

  return (
    <Button variant="outlined" onClick={() => displayRazorpay()}>
      Razorpay Payment
    </Button>
  );
};

export default Razorpay;
