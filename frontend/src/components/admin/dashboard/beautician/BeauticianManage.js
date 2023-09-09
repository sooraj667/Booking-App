import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllBeaut,
  setAllCust,
} from "../../../../feautures/adminDataAssignerSlice";
const BeauticianManage = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.adminalldatas);
  useEffect(() => {
    const allbeautdatas = localStorage.getItem("allbeautdatas");
    if (allbeautdatas) {
      dispatch(setAllBeaut(allbeautdatas));
    }
  });
  return (
    <div>
      {console.log(datas.value.allbeautdatas)}
      <h2>Beauticians</h2>
      <div className="container mt-4">
        <h2>Bootstrap Table Example</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(datas.value.allbeautdatas) ? (
              datas.value.allbeautdatas.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}

            {datas.value.allbeautdatas}

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

export default BeauticianManage;
