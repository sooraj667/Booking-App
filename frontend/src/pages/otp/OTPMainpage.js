import React from 'react'
import Otppage from '../../components/users/otp/Otppage'
import Header from '../../components/users/header/Header'

const OTPMainpage = () => {
  return (
    <div style={{backgroundImage:"url('https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')",backgroundSize: "cover",height:"750px"}}>
        <Header/>
        <Otppage/>
    </div>
  )
}

export default OTPMainpage