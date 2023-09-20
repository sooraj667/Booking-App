import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Stack from "@mui/material/Stack";
import {  Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {setBeautDetails,setExpertIn} from "../../../feautures/loginslice"
import { useEffect } from 'react';

const Topstack = () => {
    const dispatch=useDispatch()

    useEffect(
        ()=>{
          dispatch(setBeautDetails(localStorage.getItem("singledetails-B")))
          dispatch(setExpertIn(localStorage.getItem("expertin-B")))
    
        },[]
      )
    const statedatas = useSelector((state) => state.login);
  return (
    <Stack direction="row" spacing={2}>
        <Avatar
          sx={{ width: 125, height: 125 }}
          src={statedatas.value.beautdetails.image}
        />

        <Typography variant="h5" component="h2">
          {statedatas.value.beautdetails.name}
        </Typography>
      </Stack>
  )
}

export default Topstack