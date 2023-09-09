import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

   beaut:false,
   cust:false,

   

}

const adminnavigationslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            toggleBeaut:(state)=>{
                state.value.beaut=!(state.value.beaut)
                state.value.cust=false
            },
            toggleCust:(state)=>{
                state.value.cust=!(state.value.cust)
                state.value.beaut=false
            },
           
       



         }
    }




)

export const {toggleBeaut,toggleCust} = adminnavigationslice.actions
export default adminnavigationslice.reducer