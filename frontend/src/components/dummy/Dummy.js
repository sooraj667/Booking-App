import React from "react";
import HeaderDashboard from "../users/header/HeaderDashboard";
import Contents from "../users/customer/Contents";
import Topstackcust from "../users/customer/Topstackcust";
import "./Dummy.css"
import Header from "../users/header/Header";












const Dummy = () => {

  return (
    <div className="outer">
      <div className="sidebar">
      <Contents/>

      </div>
      
      

    </div>
    
    
    

  );
};

export default Dummy;












{/* <div className="">
      <div className="row">
        <HeaderDashboard />
      </div>

      <div className="row">
        <div className="col-3">


          <Contents/>

        </div>
        <div className="col-9 ">
        
          <div className="row   " >
            <div className="col-3 dashboard ">
              Dashboard
              

            </div>
            <div className="col-6 ">
             

            </div>
            <div className="col-3 mt-2 ">
            <Topstackcust/>



            </div>

          </div>
          <hr />

        </div>


      </div>

    </div> */}
