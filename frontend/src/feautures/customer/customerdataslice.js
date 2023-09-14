import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
    bookbeautdata:"",
    beautstudios:[],
   
   

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
            },
            setBeautstudios:(state,action)=>{
                state.value.beautstudios=action.payload
            }
            
           
       



         }
    }




)

export const {setBookbeautdata,setBeautstudios} = customerdataslice.actions
export default customerdataslice.reducer