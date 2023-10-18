import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

    booking_fee:false,
    add_to_favourites_booking_id:false,
   
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
            
          



         }
    }




)

export const {setBookingFee,setAddToFavouritesBookingId} = variableSlice.actions
export default variableSlice.reducer