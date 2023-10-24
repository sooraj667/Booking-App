import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

    booking_fee:false,
    add_to_favourites_booking_id:false,
    video_call_link:"",
   
}

const variableSlice=createSlice(
    {
        name:"variableSlice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            setBookingFee:(state,action)=>{
                state.value.booking_fee=action.payload
            },
            setAddToFavouritesBookingId:(state,action)=>{
                state.value.add_to_favourites_booking_id=action.payload
            },
            setVideoCallLink:(state,action)=>{
                state.value.video_call_link=action.payload
            },
            
          



         }
    }




)

export const {setBookingFee,setAddToFavouritesBookingId,setVideoCallLink} = variableSlice.actions
export default variableSlice.reducer