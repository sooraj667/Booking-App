import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

   beaut:false,
   cust:false,
   services:false,
   appointments:false,
   workshops:false,

   

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
                state.value.appointments=false
                state.value.workshops=false
            },
            toggleCust:(state)=>{
                state.value.cust=true
                state.value.beaut=false
                state.value.services=false
                state.value.appointments=false
                state.value.workshops=false
            },
            toggleServices:(state)=>{
                state.value.services=true
                state.value.beaut=false
                state.value.cust=false
                state.value.appointments=false
                state.value.workshops=false
            },
            toggleAppointments:(state)=>{
                state.value.appointments=true
                state.value.beaut=false
                state.value.cust=false
                state.value.services=false
                state.value.workshops=false
            },
            toggleWorkshops:(state)=>{
                state.value.workshops=true
                state.value.appointments=false
                state.value.beaut=false
                state.value.cust=false
                state.value.services=false
            },
           
           
       



         }
    }




)

export const {toggleBeaut,toggleCust,toggleServices,toggleAppointments,toggleWorkshops} = adminnavigationslice.actions
export default adminnavigationslice.reducer