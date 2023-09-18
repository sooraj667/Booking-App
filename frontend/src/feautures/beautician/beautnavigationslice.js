import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
   landingpart:true,
   services:false,
   appointments:false,
   profile:false,

   

}

const beautnavigationslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            toggleServices:(state)=>{
                state.value.services=true
                state.value.appointments=false
                state.value.landingpart=false
                state.value.appointments=false
                state.value.profile=false
            },
            toggleAppointments:(state)=>{
                state.value.appointments=true
                state.value.services=false
                state.value.landingpart=false
                state.value.profile=false
            },
            toggleProfile:(state)=>{
                state.value.profile=true
                state.value.services=false
                state.value.landingpart=false
                state.value.appointments=false
            },
           
       



         }
    }




)

export const {toggleServices,toggleAppointments,toggleProfile} = beautnavigationslice.actions
export default beautnavigationslice.reducer