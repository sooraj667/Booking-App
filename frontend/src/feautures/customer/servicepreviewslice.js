import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
    serviceid:""
    

    
 
   
   

}

const servicepreviewslice=createSlice(
    {
        name:"servicepreviewslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            setServiceId:(state,action)=>{
                state.value.serviceid=action.payload
            },
           
            
           
       



         }
    }




)

export const {setServiceId} = servicepreviewslice.actions
export default servicepreviewslice.reducer