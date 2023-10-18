import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

    booking_fee:false,
   
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
            
          



         }
    }




)

export const {setBookingFee} = variableSlice.actions
export default variableSlice.reducer