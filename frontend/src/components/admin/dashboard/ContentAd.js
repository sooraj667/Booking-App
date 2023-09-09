import React from 'react'
import { useDispatch } from 'react-redux'
import {toggleBeaut,toggleCust} from "../../../feautures/adminnavigationslice"

const ContentAd = () => {
    const dispatch=useDispatch()
  return (
    <div class="dashboard">
    <ul>
            <li onClick={()=>dispatch(toggleBeaut())}>Beauticians</li>
            <li onClick={()=>dispatch(toggleCust())}>Customers</li>
            <li>Services</li>
            <li>Appointments</li>
          
        </ul>
</div>
  )
}

export default ContentAd