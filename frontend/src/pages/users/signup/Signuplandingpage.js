import React from "react";
import Signup from "../../../components/users/signup/Signup";
import Header from "../../../components/users/header/Header";
const Signuplandingpage = () => {
  return (
    <>
      <Header />
      <div className="mainsignup">
        <Signup />
      </div>
    </>
  );
};

export default Signuplandingpage;
