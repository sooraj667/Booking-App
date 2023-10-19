import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
   landingpart:true,
   services:false,
   appointments:false,
   profile:false,
   studio:false,
   wallet:false,
   previousbooking:false,
   workshops:false,

   

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
                state.value.wallet=false
                state.value.previousbooking=false
                state.value.workshops=false
                
            },
            toggleAppointments:(state)=>{
                state.value.appointments=true
                state.value.services=false
                state.value.landingpart=false
                state.value.profile=false
                state.value.studio=false
                state.value.wallet=false
                state.value.previousbooking=false
                state.value.workshops=false
            },
            toggleProfile:(state)=>{
                state.value.profile=true
                state.value.services=false
                state.value.landingpart=false
                state.value.appointments=false
                state.value.studio=false
                state.value.wallet=false
                state.value.previousbooking=false
                state.value.workshops=false
            },
            toggleStudio:(state)=>{
                state.value.studio=true
                state.value.services=false
                state.value.landingpart=false
                state.value.appointments=false
                state.value.profile=false
                state.value.wallet=false
                state.value.previousbooking=false
                state.value.workshops=false
            },
            toggleWallet:(state)=>{
                state.value.wallet=true
                state.value.services=false
                state.value.landingpart=false
                state.value.appointments=false
                state.value.profile=false
                state.value.studio=false
                state.value.previousbooking=false
                state.value.workshops=false
            },
            togglePreviousBooking:(state)=>{
                state.value.previousbooking=true
                state.value.services=false
                state.value.landingpart=false
                state.value.appointments=false
                state.value.profile=false
                state.value.studio=false
                state.value.wallet=false
                state.value.workshops=false
            },
            toggleWorkshops:(state)=>{
                state.value.workshops=true
                state.value.services=false
                state.value.landingpart=false
                state.value.appointments=false
                state.value.profile=false
                state.value.studio=false
                state.value.wallet=false
                state.value.previousbooking=false
            },
           
       



         }
    }




)

export const {toggleServices,toggleAppointments,toggleProfile,toggleStudio,toggleWallet,togglePreviousBooking,toggleWorkshops} = beautnavigationslice.actions
export default beautnavigationslice.reducer