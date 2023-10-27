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
   conducted_workshops:false

   

}

const beautnavigationslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            toggleHome:(state)=>{
                state.value.landingpart=true
                state.value.services=false
                state.value.appointments=false
                state.value.appointments=false
                state.value.profile=false
                state.value.studio=false
                state.value.wallet=false
                state.value.previousbooking=false
                state.value.workshops=false
                state.value.conducted_workshops=false
                
            },
            
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
                state.value.conducted_workshops=false
                
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
                state.value.conducted_workshops=false
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
                state.value.conducted_workshops=false
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
                state.value.conducted_workshops=false
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
                state.value.conducted_workshops=false
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
                state.value.conducted_workshops=false
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
                state.value.conducted_workshops=false
            },
            toggleConductedWorkshops:(state)=>{
                state.value.conducted_workshops=true
                state.value.workshops=false
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

export const {toggleServices,toggleAppointments,toggleProfile,toggleStudio,toggleWallet,togglePreviousBooking,toggleWorkshops,toggleHome,toggleConductedWorkshops} = beautnavigationslice.actions
export default beautnavigationslice.reducer