import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Stack from "@mui/material/Stack";
import {  Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {setCustDetails} from "../../../feautures/loginslice"
import { useEffect } from 'react';

const Topstackcust = () => {
    const dispatch=useDispatch()


    useEffect(
        ()=>{
          dispatch(setCustDetails(localStorage.getItem("singledetails-C")))
          
    
        },[]
      )
    const statedatas = useSelector((state) => state.login);
  return (
    <Stack direction="row" spacing={2}>
        <Avatar
          sx={{ width: 125, height: 125 }}
          src={statedatas.value.custdetails.image}
        />

        <Typography variant="h5" component="h2">
          {statedatas.value.custdetails.name}
        </Typography>
      </Stack>
  )
}

export default Topstackcust