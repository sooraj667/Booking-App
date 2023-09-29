import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
    date:"",
    time:"",
    studio:"",
    service:"",

    
 
   
   

}

const paymentdataslice=createSlice(
    {
        name:"paymentdataslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            setDate:(state,action)=>{
                state.value.date=action.payload
            },
            setTime:(state,action)=>{
                state.value.time=action.payload
            },
            setStudio:(state,action)=>{
                state.value.studio=action.payload
            },
            setService:(state,action)=>{
                state.value.service=action.payload
            }
            
           
       



         }
    }




)

export const {setService,setDate,setStudio,setTime} = paymentdataslice.actions
export default paymentdataslice.reducer