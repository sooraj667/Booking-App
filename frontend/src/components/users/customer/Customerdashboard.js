import React,{ useEffect } from 'react'
import {setCustDetails} from "../../../feautures/loginslice"
import { useDispatch,useSelector } from 'react-redux';
import HeaderDashboard from '../header/HeaderDashboard';
const Customerdashboard = () => {
    const details = useSelector((state) => state.login);
    const dispatch=useDispatch()
    useEffect(() => {
        const custDetails = localStorage.getItem("singledetails-C");
        if (custDetails) {
          const parsed=JSON.parse(custDetails)
          dispatch(setCustDetails(parsed));
        }
      },[]);
  return (
    <div>
        <HeaderDashboard/>
        <div className="row">
          <div className="col-md-3">
          {/* <Contents/> */}
          <h1>Customer</h1>

          </div>
          <div className="col-md-9">
          {details.value.custdetails.email}
            
          </div>



        </div>
        
  
      
  
    </div>
  )
}

export default Customerdashboard