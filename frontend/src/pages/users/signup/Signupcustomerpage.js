import React from 'react'
import Signupcustomer from '../../../components/users/signup/Signupcustomer'
import Header from '../../../components/users/header/Header'
const Signupcustomerpage = () => {
  return (
    <div  style={{
      backgroundImage:
        "url('https://img.freepik.com/free-photo/handsome-bearded-man-barbershop-barber-work_627829-7370.jpg?w=900&t=st=1694026924~exp=1694027524~hmac=b82bc3e4599b2084b1d8e6e5d31f3ed92e3f4b11416e15c4c3d70744e471265c",
      backgroundSize: "cover",
    }}>
        <Header/>
        <Signupcustomer/>
    </div>
  )
}

export default Signupcustomerpage