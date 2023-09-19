import React from 'react'
import Customerdashboard from '../../../components/users/customer/Customerdashboard'
import {setCustDetails,setAllBeauticiansC} from "../../../feautures/loginslice"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Customerpage = () => {
  const dispatch=useDispatch()
  useEffect(() => {
    const custDetails = localStorage.getItem("singledetails-C");
    const allBeauticians = localStorage.getItem("allbeauticians-C");

    if (custDetails) {
      const custdetails_parsed=JSON.parse(custDetails)
      dispatch(setCustDetails(custdetails_parsed));
    }
    if (allBeauticians) {
      const allbeaut_parsed=JSON.parse(allBeauticians)
      dispatch(setAllBeauticiansC(allbeaut_parsed));
    }
  },[]);
  return (
    <div><Customerdashboard/></div>
  )
}

export default Customerpage