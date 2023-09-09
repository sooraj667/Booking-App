import React from "react";
import Logincustomer from "../../../components/users/login/Logincustomer";
import Header from "../../../components/users/header/Header";
const Logincustomerpage = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1527769929977-c341ee9f2033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80')",
          backgroundSize:"fit",
        height: "610px",
      }}
    >
      <Header />
      <Logincustomer />
      {/* EFFF */}
    </div>
  );
};

export default Logincustomerpage;
