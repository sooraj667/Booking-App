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
   allworkshops:false,
   bookedworkshops:false,
   attendedworkshops:false,
   cancelledworkshops:false


   

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
                state.value.allworkshops=false
                state.value.bookedworkshops=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
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
                state.value.allworkshops=false
                state.value.bookedworkshops=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
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
                state.value.allworkshops=false
                state.value.bookedworkshops=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
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
                state.value.allworkshops=false
                state.value.bookedworkshops=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
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
                state.value.allworkshops=false
                state.value.bookedworkshops=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
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
                state.value.allworkshops=false
                state.value.bookedworkshops=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
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
                state.value.allworkshops=false
                state.value.bookedworkshops=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
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
                state.value.allworkshops=false
                state.value.bookedworkshops=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
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
                state.value.allworkshops=false
                state.value.bookedworkshops=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
            },
            toggleAllWorkShops:(state,action)=>{
                state.value.allworkshops=true
                state.value.servicepreview=false
                state.value.favouritestylists=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.landingpart=false
                state.value.wallet=false
                state.value.previousbooking=false
                state.value.bookedworkshops=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
            },
            toggleBookedWorkShops:(state,action)=>{
                state.value.bookedworkshops=true
                state.value.allworkshops=false
                state.value.servicepreview=false
                state.value.favouritestylists=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.landingpart=false
                state.value.wallet=false
                state.value.previousbooking=false
                state.value.attendedworkshops=false
                state.value.cancelledworkshops=false
                
            },
            toggleAttendedWorkShops:(state,action)=>{
                state.value.attendedworkshops=true
                state.value.bookedworkshops=false
                state.value.allworkshops=false
                state.value.servicepreview=false
                state.value.favouritestylists=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.landingpart=false
                state.value.wallet=false
                state.value.previousbooking=false
                state.value.cancelledworkshops=false
                
            },
            toggleCancelledWorkShops:(state,action)=>{
                state.value.cancelledworkshops=true
                state.value.attendedworkshops=false
                state.value.bookedworkshops=false
                state.value.allworkshops=false
                state.value.servicepreview=false
                state.value.favouritestylists=false
                state.value.bookings=false
                state.value.browse=false
                state.value.booknow=false
                state.value.profile=false
                state.value.landingpart=false
                state.value.wallet=false
                state.value.previousbooking=false
                
            }

            

           
       



         }
    }




)

export const {toggleFavouritestylists,toggleBookings,toggleBrowse,toggleBooknow,toggleProfile,toggleServicePreview,toggleLandingPart,toggleWallet,togglePreviousBooking,toggleAllWorkShops,toggleBookedWorkShops,toggleAttendedWorkShops,toggleCancelledWorkShops} = customernavigationslice.actions
export default customernavigationslice.reducer