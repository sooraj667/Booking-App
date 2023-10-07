import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
    beautician:false,
    customer:false



}

const forgotpasswordslice=createSlice(
    {
        name:"forgotpasswordslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            setBeautician:(state)=>{
                state.value.beautician=true
                state.value.customer=false
            },
            setCustomer:(state)=>{
                state.value.customer=true
                state.value.beautician=false
            },
            
       



         }
    }




)

export const {setCustomer,setBeautician} = forgotpasswordslice.actions
export default forgotpasswordslice.reducer