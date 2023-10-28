import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAllAppointments
  
} from "../../../../feautures/adminDataAssignerSlice";
import  Button  from "@mui/material/Button";
import axiosInstance from "../../../../axios/axiosconfig";
import { Avatar } from "@mui/material";
const Appointments = () => {
  const [blockStatus,setBlockStatus]=useState("")
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.adminalldatas);
  useEffect(() => {
    const allappointments = localStorage.getItem("allappointments");
    if (allappointments) {
      const parsed=JSON.parse(allappointments)
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
    {console.log(datas.value.allappointments)}
    <div className="sub-heading-div flex justify-center align-center py-3 text-medium  fw-2 sgfont  themecolor underline">
        APPOINTMENTS
       
      </div>
    <div className="container mt-4">
      
      <table className="table table-striped table-bordered">
        <thead>
          <tr>

            <th> Beautician</th>
            <th>Customer</th>
            <th>Studio</th>
            <th>Scheduled On</th>
         

          </tr>
        </thead>
        <tbody>
          {Array.isArray(datas.value.allappointments) ? (
            datas.value.allappointments.map((item) => (
              <tr key={item.id}>
                
                <td><div className="flex justify-between">{item.beautician.name} <Avatar src={item.beautician.image}></Avatar></div></td>
                <td><div className="flex justify-between">{item.customer.name} <Avatar src={item.customer.image}></Avatar></div></td>
                <td>{item.studio.studio_name} <br /> {item.studio.locality}  <br /> {item.studio.place}  <br /> {item.studio.district} <br /> {item.studio.state} <br /> {item.studio.country} <br />Pin Code -  {item.studio.pincode}</td>
                <td>Date -{item.date} <br /> Time - {item.time}</td>

                
                
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
      {console.log(datas.value.allappointments,"********&&&&&#######")}
    </div>
  </div>
  )
}

export default Appointments