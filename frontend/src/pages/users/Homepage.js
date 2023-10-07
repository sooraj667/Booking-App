import React from 'react'
import Header from "../../components/users/header/Header"
import Landingbody from '../../components/users/landingbody/Landingbody'

const Homepage = () => {
  return (
    <div>
        <Header/>
        <div className="container-fluid landing">
        <Landingbody/>

        </div>

        
        
    
    </div>
  )
}

export default Homepage