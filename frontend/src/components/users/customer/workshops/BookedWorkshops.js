import React, { useEffect, useState } from "react";

const BookedWorkshops = () => {
  const [allWorkshops, setAllWorkShops] = useState([]);
  const [noWS, setNoWS] = useState(false);
  useEffect(() => {
    const datas={
        custid:JSON.parse(localStorage.getItem("singledetails-C")).id
    }
    axiosInstance.post("cust/get-currentuser-workshops/",datas).then((res) => {
      if (res.data.message === "no-workshops") {
        setNoWS(true);
      } else {
        setNoWS(false);
        setAllWorkShops(res.data.allworkshops);
      }
    });
  }, []);
  return (
    <div>
      <div className="hero">BOOKED WORKSHOPS</div>
      <hr />
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
        The upcoming workshops booked by you are shown here
      </div>
    </div>
  );
};

export default BookedWorkshops;
