import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
    bookbeautdata:""
   
   

}

const customerdataslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            setBookbeautdata:(state,action)=>{
                state.value.bookbeautdata=action.payload
            }
            
           
       



         }
    }




)

export const {setBookbeautdata} = customerdataslice.actions
export default customerdataslice.reducer