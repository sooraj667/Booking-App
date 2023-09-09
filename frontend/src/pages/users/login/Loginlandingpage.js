import React from 'react'
import Login from '../../../components/users/login/Login'
import Header from '../../../components/users/header/Header'
const Loginlandingpage = () => {
  return (
    <div style={{backgroundImage:"url('https://images.unsplash.com/photo-1555679427-1f6dfcce943b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80')",backgroundSize: "cover",height:"750px"}}>
        <Header/>
        <Login/>

    </div>
  )
}

export default Loginlandingpage