import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
   landingpart:true,
   favouritestylists:false,
   bookings:false,
   browse:false,
   booknow:false,
   profile:false,
   booknowbeauticianid:"",
   servicepreview:false,

   

}

const customernavigationslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            toggleFavouritestylists:(state)=>{
                state.value.favouritestylists=true
                state.value.bookings=false
                state.value.landingpart=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.servicepreview=false
            },
            toggleBookings:(state)=>{
                state.value.bookings=true
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.servicepreview=false
            },
            toggleBrowse:(state)=>{
                state.value.browse=true
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.bookings=false
                state.value.booknow=false
                state.value.profile=false
                state.value.servicepreview=false
            },
            toggleBooknow:(state,action)=>{
                state.value.booknow=true
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.bookings=false
                state.value.browse=false
                state.value.profile=false
                state.value.servicepreview=false
                state.value.booknowbeauticianid=action.payload
            },
            toggleProfile:(state,action)=>{
                state.value.profile=true
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.servicepreview=false
            },
            toggleServicePreview:(state,action)=>{
                state.value.servicepreview=true
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
            }
           
       



         }
    }




)

export const {toggleFavouritestylists,toggleBookings,toggleBrowse,toggleBooknow,toggleProfile,toggleServicePreview} = customernavigationslice.actions
export default customernavigationslice.reducer