import React from 'react'
import "./ChangePasswordUI.css"
import Paper from '@mui/material/Paper';
import ChangePWForm from './ChangePWForm';

const ChangePasswordUI = () => {
  return (
    <div className='container-fluid maindiv'>
        <div className="row">
            <div className="col-3">

            </div>
            <div className="col-6">
                <Paper elevation={3} className='fppaper' sx={{marginTop:10,backgroundColor:"rgba(221, 193, 193, 0.3)", padding:1}}>
                    <ChangePWForm/>
                    
                    

                </Paper>


            </div>
            <div className="col-3">

            </div>

        </div>
        






    </div>
  )
}

export default ChangePasswordUI