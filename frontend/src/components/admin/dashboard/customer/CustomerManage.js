import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllCust } from "../../../../feautures/adminDataAssignerSlice";
import Button from "@mui/material/Button";
import axiosInstance from "../../../../axios/axiosconfig";
import { Avatar } from "@mui/material";

const CustomerManage = () => {
  const [blockStatus, setBlockStatus] = useState("");
  const dispatch = useDispatch();
  const admindatas = useSelector((state) => state.adminalldatas);
  useEffect(() => {
    const allcustdatas = localStorage.getItem("allcustdatas");
    if (allcustdatas) {
      const parsed = JSON.parse(allcustdatas);
      dispatch(setAllCust(parsed));
    }
  }, []);

  const handleBlock = (id) => {
    console.log(id, "CUSTID");
    const datas = {
      custid: id,
    };
    axiosInstance
      .post("adminside/blockcust/", datas)
      .then((res) => {
        console.log(res.data.allcustdatas);
        localStorage.setItem(
          "allcustdatas",
          JSON.stringify(res.data.allcustdatas)
        );
        const allcustdatas = localStorage.getItem("allcustdatas");
        const parsed = JSON.parse(allcustdatas);

        dispatch(setAllCust(parsed));
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      {console.log(admindatas.value.allcustdatas)}
      <div className="sub-heading-div flex justify-center align-center py-3 text-medium  fw-2 sgfont  themecolor underline">
        CUSTOMERS
      </div>
      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              

              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Image</th>
              <th>Block</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(admindatas.value.allcustdatas) ? (
              admindatas.value.allcustdatas.map((item) => (
                <tr key={item.id}>
                  
                  <td>{item.name} </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
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

export default CustomerManage;
