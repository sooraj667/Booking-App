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
   wallet:false,
   previousbooking:false,


   

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
                state.value.wallet=false
                state.value.previousbooking=false
            },
            toggleBookings:(state)=>{
                state.value.bookings=true
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.servicepreview=false
                state.value.wallet=false
                state.value.previousbooking=false
            },
            toggleBrowse:(state)=>{
                state.value.browse=true
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.bookings=false
                state.value.booknow=false
                state.value.profile=false
                state.value.servicepreview=false
                state.value.wallet=false
                state.value.previousbooking=false
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
                state.value.wallet=false
                state.value.previousbooking=false
            },
            toggleProfile:(state,action)=>{
                state.value.profile=true
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.servicepreview=false
                state.value.wallet=false
                state.value.previousbooking=false
            },
            toggleServicePreview:(state,action)=>{
                state.value.servicepreview=true
                state.value.favouritestylists=false
                state.value.landingpart=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.wallet=false
                state.value.previousbooking=false
            },
            toggleLandingPart:(state,action)=>{
                state.value.landingpart=true
                state.value.servicepreview=false
                state.value.favouritestylists=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.wallet=false
                state.value.previousbooking=false
            },
            toggleWallet:(state,action)=>{
                state.value.wallet=true
                state.value.servicepreview=false
                state.value.favouritestylists=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.landingpart=false
                state.value.previousbooking=false
            },
            togglePreviousBooking:(state,action)=>{
                state.value.previousbooking=true
                state.value.servicepreview=false
                state.value.favouritestylists=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.landingpart=false
                state.value.wallet=false
            }
            

           
       



         }
    }




)

export const {toggleFavouritestylists,toggleBookings,toggleBrowse,toggleBooknow,toggleProfile,toggleServicePreview,toggleLandingPart,toggleWallet,togglePreviousBooking} = customernavigationslice.actions
export default customernavigationslice.reducer