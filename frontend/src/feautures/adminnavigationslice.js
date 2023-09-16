import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

   beaut:false,
   cust:false,
   services:false,

   

}

const adminnavigationslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            toggleBeaut:(state)=>{
                state.value.beaut=true
                state.value.cust=false
                state.value.services=false
            },
            toggleCust:(state)=>{
                state.value.cust=true
                state.value.beaut=false
                state.value.services=false
            },
            toggleServices:(state)=>{
                state.value.services=true
                state.value.beaut=false
                state.value.cust=false
            },
           
           
       



         }
    }




)

export const {toggleBeaut,toggleCust,toggleServices} = adminnavigationslice.actions
export default adminnavigationslice.reducer