import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllBeaut,
  setAllCust,
} from "../../../../feautures/adminDataAssignerSlice";
import Button from "@mui/material/Button";
import axiosInstance from "../../../../axios/axiosconfig";
import { Avatar } from "@mui/material";
const WorkshopsManage = () => {
  const [allWorkshops, setAllWorkShops] = useState([]);
  const [blockStatus, setBlockStatus] = useState("");
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.adminalldatas);
  useEffect(() => {
    axiosInstance.get("cust/getallworkshops/").then((res) => {
      if (res.data.message === "no-workshops") {
      } else {
        setAllWorkShops(res.data.allworkshops);
      }
    });
  }, []);
  return (
    <div>
      {console.log(datas.value.allbeautdatas)}
      <div className="sub-heading-div flex justify-center align-center py-3 text-medium  fw-2 sgfont  themecolor underline">
        WORKSHOPS
      </div>
      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Subject</th>
              <th>Conducting Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Deadline</th>

              <th>Description</th>

              <th>Seats</th>
              <th>Booked By</th>
            </tr>
          </thead>
          <tbody>
            {allWorkshops.map((item) => (
              <tr key={item.id}>
                <td>{item.subject}</td>
                <td>{item.conducting_date}</td>
                <td>
                  {item.start_time}-{item.end_time}
                </td>
                <td>{item.price}</td>
                <td>{item.registration_deadline}</td>
                <td>{item.description}</td>
                <td>{item.total_seats}</td>

                <td>
                
                    {item.customers?.map((cus) => {
                      return (
                        <div className="flex">
                          {cus.name} <Avatar src={cus.image}></Avatar>
                          <br />
                        </div>
                      );
                    })}
                  
                </td>

                {/* {
                     item.isblocked==="True"? <Button variant="outlined" onClick={()=>handleBlock(item.id)} sx={{backgroundColor:"#3CB371",color:"white"}}>Unblock</Button>:<Button variant="contained" onClick={()=>handleBlock(item.id)} sx={{backgroundColor:"#DC143C"}}>Block</Button>
                  } */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkshopsManage;
