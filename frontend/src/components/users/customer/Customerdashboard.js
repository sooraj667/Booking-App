import React,{ useEffect } from 'react'
import {setCustDetails,setAllBeauticiansC} from "../../../feautures/loginslice"

import { useDispatch,useSelector } from 'react-redux';
import HeaderDashboard from '../header/HeaderDashboard';
import Landingpartcust from './Landingpartcust';
import Favouritestylists from './favouritestylists/Favouritestylists';
import Contents from './Contents';
import Browse from './Browse';
import Booknow from './Booknow';
import Booking from './bookings/Booking';
import Profile from './profile/Profile';
const Customerdashboard = () => {
    const details = useSelector((state) => state.login);
    const navigationdatas = useSelector((state) => state.custnavigation);
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
    <div>
    <HeaderDashboard/>
    <div className="row">
      <div className="col-md-3">
      <Contents/>

      </div>
      <div className="col-md-9">
      {
        navigationdatas.value.landingpart && <Landingpartcust/>
      }
     
      {
        navigationdatas.value.favouritestylists && <Favouritestylists/>

      }
       {
        navigationdatas.value.browse && <Browse/>

      }
        {
        navigationdatas.value.booknow && <Booknow/>

      }
      {
        navigationdatas.value.bookings && <Booking/>

      }
       {
        navigationdatas.value.profile && <Profile/>

      }
     
        
      </div>



    </div>
    

  

</div>
  )
}

export default Customerdashboard