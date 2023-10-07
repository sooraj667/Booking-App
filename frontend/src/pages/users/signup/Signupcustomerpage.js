import React from "react";
import Signupcustomer from "../../../components/users/signup/Signupcustomer";
import Header from "../../../components/users/header/Header";
const Signupcustomerpage = () => {
  return (
    <div>
      <Header />
      <div className="customersignup">
        <Signupcustomer />
      </div>
    </div>
  );
};

export default Signupcustomerpage;
