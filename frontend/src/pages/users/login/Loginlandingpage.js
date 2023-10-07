import React from 'react'
import Login from '../../../components/users/login/Login'
import Header from '../../../components/users/header/Header'
const Loginlandingpage = () => {
  return (
    <div >
        <Header/>
        <div className="container-fluid login-landing">
        <Login/>

        </div>
        

    </div>
  )
}

export default Loginlandingpage