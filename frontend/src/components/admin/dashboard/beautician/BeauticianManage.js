import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllBeaut,
  setAllCust,
} from "../../../../feautures/adminDataAssignerSlice";
import Button from "@mui/material/Button";
import axiosInstance from "../../../../axios/axiosconfig";
import { Avatar } from "@mui/material";
const BeauticianManage = () => {
  const [blockStatus, setBlockStatus] = useState("");
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.adminalldatas);
  useEffect(() => {
    const allbeautdatas = localStorage.getItem("allbeautdatas");
    if (allbeautdatas) {
      const parsed = JSON.parse(allbeautdatas);
      dispatch(setAllBeaut(parsed));
    }
  }, []);

  const handleBlock = (id) => {
    const datas = {
      beautid: id,
    };
    axiosInstance
      .post("adminside/blockbeaut/", datas)
      .then((res) => {
        console.log(res.data.message);
        localStorage.setItem(
          "allbeautdatas",
          JSON.stringify(res.data.allbeautdatas)
        );
        const allbeautdatas = localStorage.getItem("allbeautdatas");
        const parsed = JSON.parse(allbeautdatas);

        dispatch(setAllBeaut(parsed));
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
      {console.log(datas.value.allbeautdatas)}
      <div className="sub-heading-div flex justify-center align-center py-3 text-medium  fw-2 sgfont  themecolor underline">
        BEAUTICIANS
      </div>
      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
          

              <th> Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Image</th>
              <th>Block</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(datas.value.allbeautdatas) ? (
              datas.value.allbeautdatas.map((item) => (
                <tr key={item.id}>
                
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    {" "}
                    <Avatar
                      src={item.image}
                      sx={{ width: 70, height: 70 }}
                    ></Avatar>
                  </td>
                  <div className="flex justify-center mt-3">

                  {item.isblocked === "True" ? (
                    <Button
                      variant="outlined"
                      onClick={() => handleBlock(item.id)}
                      sx={{ backgroundColor: "#3CB371", color: "white" }}
                    >
                      Unblock
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleBlock(item.id)}
                      sx={{ backgroundColor: "#DC143C" }}
                    >
                      Block
                    </Button>
                  )}
                       </div>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BeauticianManage;
