import React from 'react'
import Button from "@mui/joy/Button";
import toast from 'react-hot-toast';

const Razorpay = () => {
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
  const dispalyRazorpay = async (amount, trainer_id) => {
    // beautid: reqdatas.value.bookbeautdata.id,
    // custid: statedatas.value.custdetails.id,
    const date= localStorage.getItem("date")
    const time= localStorage.getItem("time")
    const studio= localStorage.getItem("studio")
    const servicename= localStorage.getItem("service")
    console.log(`${date} ${time} ${studio} ${servicename}  ,MYRR`);
    if (!date || !time ||   !studio || !servicename ){
        toast.error("Select All values")
        return
    }
     
    const det = localStorage.getItem("singledetails-C");
    if (det) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("You are offline.. failed to laod razorpay");
        return;
      }
      const options = {
        key: "rzp_test_dpiSP2IlPN5nSf",
        currency: "INR",
        amount: amount * 100,
        name: "User",
        description: "Thanks for purchasing",

        handler: function (response) {
        //   alert(response.razorpay_payment_id);
        //   const paymentData = {
        //     paymentId: response.razorpay_payment_id,
        //   };
        //   const cookieData = localStorage.getItem("details");
        //   console.log("haiis", cookieData);
        //   const parsedData = JSON.parse(cookieData);
        //   console.log("haiim", parsedData.id, trainer_id);
        //   const datas = {
        //     userid: parsedData.id,
        //     trainerid: trainer_id,
        //     paymentId: response.razorpay_payment_id,
        //   };

        //   axiosInstance
        //     .post("suscription/", datas)
        //     .then((res) => {
        //       if (res.data.message === "already subscribed") {
        //         alert("Already subscribed");
        //         console.log("already");
        //       } else {
        //         alert("successfully subscribed");
        //       }
        //     })
        //     .catch((error) => {
        //       console.error("Error sending payment data to backend:", error);
        //     });
          alert("payment Succesful");
        },
        prefill: {
          name: "Arun",
        },
      };
      const paymentObj = new window.Razorpay(options);
      paymentObj.open();
    } else {
    //   navigate("/login");
    alert("ELSE")
    }
  };


  return (
    <Button onClick={()=>dispalyRazorpay(1000,1)}>Razorpay</Button>
  )
}

export default Razorpay