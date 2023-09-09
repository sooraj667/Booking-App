import React from "react";
import Signup from "../../../components/users/signup/Signup";
import Header from "../../../components/users/header/Header";
const Signuplandingpage = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/handsome-man-barber-shop-styling-hair_1303-20978.jpg?w=900&t=st=1694015109~exp=1694015709~hmac=36ced935c8582a2ec223ac33da73dd0105c513f08b57fe8f947465966b7e7fce",
        backgroundSize: "cover",height:"750px"
      }}
    >
      <Header />
      <Signup />
    </div>
  );
};

export default Signuplandingpage;
