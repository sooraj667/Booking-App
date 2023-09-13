import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
   landingpart:true,
   favouritestylists:false,
   bookings:false,
   browse:false,

   

}

const customernavigationslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            toggleFavouritestylists:(state)=>{
                state.value.favouritestylists=!(state.value.services)
                state.value.bookings=false
                state.value.landingpart=false
                state.value.browse=false
            },
            toggleBookings:(state)=>{
                state.value.bookings=!(state.value.bookings)
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.browse=false
            },
            toggleBrowse:(state)=>{
                state.value.browse=!(state.value.browse)
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.bookings=false
            }
           
       



         }
    }




)

export const {toggleFavouritestylists,toggleBookings,toggleBrowse} = customernavigationslice.actions
export default customernavigationslice.reducer