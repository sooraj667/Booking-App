import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAllAppointments
  
} from "../../../../feautures/adminDataAssignerSlice";
import  Button  from "@mui/material/Button";
import axiosInstance from "../../../../axios/axiosconfig";

const Appointments = () => {
  const [blockStatus,setBlockStatus]=useState("")
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.adminalldatas);
  useEffect(() => {
    const allappointmentsdatas = localStorage.getItem("allappointmentsdatas");
    if (allappointmentsdatas) {
      const parsed=JSON.parse(allappointmentsdatas)
      dispatch(setAllAppointments(parsed));
    }
  },[]);

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
    {console.log(datas.value.allappointmentsdatas)}
    <h2>Appointments</h2>
    <div className="container mt-4">
      
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Sl No</th>
            <th> Beautician</th>
            <th>Customer</th>
            <th>Studio</th>
            <th>Amount</th>

          </tr>
        </thead>
        <tbody>
          {Array.isArray(datas.value.allappointmentdatas) ? (
            datas.value.allappointmentsdatas.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                
                {/* {
                   item.isblocked==="True"? <Button variant="outlined" onClick={()=>handleBlock(item.id)} sx={{backgroundColor:"#3CB371",color:"white"}}>Unblock</Button>:<Button variant="contained" onClick={()=>handleBlock(item.id)} sx={{backgroundColor:"#DC143C"}}>Block</Button>
                } */}
                
               
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
  )
}

export default Appointments