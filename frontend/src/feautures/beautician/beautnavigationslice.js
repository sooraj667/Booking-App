import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
   landingpart:true,
   services:false,
   appointments:false,

   

}

const beautnavigationslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            toggleServices:(state)=>{
                state.value.services=!(state.value.services)
                state.value.appointments=false
                state.value.landingpart=false
            },
            toggleAppointments:(state)=>{
                state.value.appointments=!(state.value.appointments)
                state.value.services=false
                state.value.landingpart=false
            },
           
       



         }
    }




)

export const {toggleServices,toggleAppointments} = beautnavigationslice.actions
export default beautnavigationslice.reducer