import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllservices } from "../../../feautures/adminDataAssignerSlice";
import Button from "@mui/material/Button";
import axiosInstance from "../../../axios/axiosconfig";
import Addnewservicemodal from "./Addnewservicemodal";
import Avatar from "@mui/material/Avatar";
import toast, { Toaster } from "react-hot-toast";
const ServicesAdmin = () => {
  const [blockStatus, setBlockStatus] = useState("");
  const dispatch = useDispatch();
  const admindatas = useSelector((state) => state.adminalldatas);
  useEffect(() => {
    const allservices = localStorage.getItem("allservices");

    if (allservices) {
      const parsed = JSON.parse(allservices);
      dispatch(setAllservices(parsed));
    }
  }, []);

  //   const handleBlock=(id)=>{
  //     const datas={
  //       beautid:id
  //     }
  //     axiosInstance.post("adminside/blockbeaut/",datas).then((res)=>{
  //       console.log(res.data.message)
  //       localStorage.setItem("allbeautdatas",JSON.stringify(res.data.allbeautdatas))
  //       const allbeautdatas=localStorage.getItem("allbeautdatas")
  //       const parsed=JSON.parse(allbeautdatas)

  //       dispatch(setAllBeaut(parsed));

  //     }).catch((error)=> alert(error))

  //   }
  return (
    <div>
      <Toaster/>
      <div className="sub-heading-div flex justify-center align-center py-3 text-medium  fw-2 sgfont  themecolor underline">
        SERVICES{" "}
        <span className="ml-2 cur">
          {" "}
          <Addnewservicemodal />
        </span>
      </div>
      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
             

              <th>Service Name</th>

              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(admindatas.value.allservices) ? (
              admindatas.value.allservices.map((item) => (
                <tr key={item.id}>
                  
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <Avatar alt="Remy Sharp" src={item.image} />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}

            {/* <tr>
          <td>2</td>
          <td>Jane</td>
          <td>Smith</td>
          <td>jane@example.com</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Bob</td>
          <td>Johnson</td>
          <td>bob@example.com</td>
        </tr> */}
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesAdmin;
