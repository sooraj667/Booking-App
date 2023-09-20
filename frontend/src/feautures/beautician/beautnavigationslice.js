import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
   landingpart:true,
   services:false,
   appointments:false,
   profile:false,
   studio:false,

   

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
                state.value.studio=false
                
            },
            toggleAppointments:(state)=>{
                state.value.appointments=true
                state.value.services=false
                state.value.landingpart=false
                state.value.profile=false
                state.value.studio=false
            },
            toggleProfile:(state)=>{
                state.value.profile=true
                state.value.services=false
                state.value.landingpart=false
                state.value.appointments=false
                state.value.studio=false
            },
            toggleStudio:(state)=>{
                state.value.studio=true
                state.value.services=false
                state.value.landingpart=false
                state.value.appointments=false
                state.value.profile=false
            },
           
       



         }
    }




)

export const {toggleServices,toggleAppointments,toggleProfile,toggleStudio} = beautnavigationslice.actions
export default beautnavigationslice.reducer